const express = require("express")
const bodyParser = require("body-parser")
const { spawn } = require("child_process")
const session = require("express-session")
const {
    hashPassword,
    comparePasswordToHashedPassword
} = require("./bcrypt/password-hash-helpers")

const { isLogin } = require("./middleware/isLogin")

const MongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId
const uri = `mongodb+srv://root:root@cluster0.ssjdrmy.mongodb.net/?retryWrites=true&w=majority`
const userName = "cmpt_372"
const password = "Password123"
const testingURI = `mongodb+srv://${userName}:${password}@cmput-372.zarzqam.mongodb.net/?retryWrites=true&w=majority`

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
    session({
        name: "session",
        secret: "cmpt372",
        resave: false,
        maxAge: 24 * 60 * 60 * 1000,
        saveUninitialized: true
    })
)

const client = new MongoClient(testingURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function connect() {
    try {
        await client.connect()
        console.log("Connected to MongoDB Cloud")
    } catch (error) {
        console.error(error)
    }
}

connect()

const db = client.db("cmpt372")

app.post("/:uid/:qid/code", isLogin, async (req, res) => {
    const { code } = req.body
    const { uid } = req.params
    const { qid } = req.params

    const python = spawn("python", ["-c", code])

    let output = ""

    python.stdout.on("data", data => {
        output += data.toString()
    })

    python.stderr.on("data", data => {
        output += data.toString()
    })

    python.on("exit", async () => {
        const collection = db.collection("codes")

        try {
            const result = await collection.insertOne({
                uid: uid,
                qid: qid,
                code,
                output
            })
            res.json({ output })
            console.log("Code saved to database:", result.insertedId)
        } catch (error) {
            console.error(error)
        }
    })
})

app.get("/:uid/:qid/code", isLogin, async (req, res) => {
    const collection = db.collection("codes")
    const { uid } = req.params
    const { qid } = req.params

    try {
        const result = await collection
            .find({ uid: uid, qid: qid })
            .sort({ _id: -1 })
            .toArray()
        res.json({
            isLogin: true,
            output: result
        })
    } catch (error) {
        console.error(error)
    }
})

app.get("/:uid/:qid/:cid", isLogin, async (req, res) => {
    const collection = db.collection("codes")
    const { uid } = req.params
    const { qid } = req.params
    const { cid } = req.params

    try {
        const result = await collection.findOne({
            _id: new ObjectId(cid),
            uid: uid,
            qid: qid
        })
        res.json(result)
    } catch (error) {
        console.error(error)
    }
})

app.delete("/:uid/:qid/:cid", isLogin, async (req, res) => {
    const collection = db.collection("codes")
    const { uid } = req.params
    const { qid } = req.params
    const { cid } = req.params

    try {
        const result = await collection.deleteOne({
            _id: new ObjectId(cid),
            uid: uid,
            qid: qid
        })
        res.json(result)
    } catch (error) {
        console.error(error)
    }
})

app.get("/:uid", isLogin, async (req, res) => {
    const collection = db.collection("questions")

    try {
        const result = await collection.find().toArray()
        res.json({
            isLogin: true,
            output: result
        })
    } catch (error) {
        console.error(error)
    }
})

app.get("/:uid/:qid", isLogin, async (req, res) => {
    const collection = db.collection("questions")
    const { qid } = req.params

    try {
        const result = await collection.findOne({ _id: new ObjectId(qid) })
        res.json({
            isLogin: true,
            output: result.question
        })
    } catch (error) {
        console.error(error)
    }
})

app.post("/login", async (req, res) => {
    const collection = db.collection("users")
    var user = req.body.user
    var password = req.body.password
    try {
        const result = await collection.findOne({ user: user })

        // user does not exist
        if (result == null) {
            res.json({ message: "invalid username or password", isLogin: false })
            return
        }

        const passwordMatch = await comparePasswordToHashedPassword(
            password,
            result.password
        )

        // user exists but invalid password was given
        if (!passwordMatch) {
            res.json({ message: "invalid password", isLogin: false })
            return
        }

        req.session.user = user
        res.json({
            dataFromServer: result,
            isLogin: true
        })
    } catch (error) {
        console.error(error)
    }
})

app.delete("/logout", async (req, res) => {
    if (req.session) {
        req.session.destroy()
        res.json({ isLogin: false })
    }
})

app.post("/signup", async (req, res) => {
    const collection = db.collection("users")
    var user = req.body.user
    var password = req.body.password

    if (!user.endsWith("@sfu.ca")) {
        res.json("Email must end with @sfu.ca")
        return
    }

    try {
        const result = await collection.findOne({ user: user })
        if (result == null) {
            const hashedPassword = await hashPassword(password)
            await collection.insertOne({
                user,
                password: hashedPassword,
                type: "student"
            })
            res.json("Registration Successful")
        } else {
            res.json("Email Address is Already Registered")
        }
    } catch (error) {
        console.error(error)
    }
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
