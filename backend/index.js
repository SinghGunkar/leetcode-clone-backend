const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const session = require('express-session');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://root:root@cluster0.ssjdrmy.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
        name: 'session',
        secret: 'cmpt372',
        resave: false,
        maxAge: 24 * 60 * 60 * 1000,
        saveUninitialized: true
    })
)


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Cloud');
    } catch (error) {
        console.error(error);
    }
}

connect();

const db = client.db('cmpt372');

app.post('/:uid/:qid/code', isLogin, async (req, res) => {
    const { code } = req.body;
    const { uid } = req.params;
    const { qid } = req.params;

    const python = spawn('python', ['-c', code]);

    let output = '';

    python.stdout.on('data', (data) => {
        output += data.toString();
    });

    python.stderr.on('data', (data) => {
        output += data.toString();
    });

    python.on('exit', async () => {
        const collection = db.collection('codes');

        try {
            const result = await collection.insertOne({ uid: uid, qid: qid, code, output });
            res.json({ output });
            console.log('Code saved to database:', result.insertedId);
        } catch (error) {
            console.error(error);
        }
    });

});

app.get('/:uid/:qid/code', isLogin, async (req, res) => {
    const collection = db.collection('codes');
    const { uid } = req.params;
    const { qid } = req.params;

    try {
        const result = await collection.find({ uid: uid, qid: qid }).sort({ _id: -1 }).toArray();
        res.json({
            isLogin: true,
            output: result
        });
    } catch (error) {
        console.error(error);
    }
});

app.get('/:uid/:qid/:cid', isLogin, async (req, res) => {
    const collection = db.collection('codes');
    const { uid } = req.params;
    const { qid } = req.params;
    const { cid } = req.params;

    try {
        const result = await collection.findOne({ _id: new ObjectId(cid), uid: uid, qid: qid });
        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

app.delete('/:uid/:qid/:cid', isLogin, async (req, res) => {
    const collection = db.collection('codes');
    const { uid } = req.params;
    const { qid } = req.params;
    const { cid } = req.params;

    try {
        const result = await collection.deleteOne({ _id: new ObjectId(cid), uid: uid, qid: qid });
        res.json(result);
    } catch (error) {
        console.error(error);
    }
});


app.get('/:uid', isLogin, async (req, res) => {
    const collection = db.collection('questions');

    try {
        const result = await collection.find().toArray();
        res.json({
            isLogin: true,
            output: result
        });
    } catch (error) {
        console.error(error);
    }
});

app.get('/:uid/:qid', isLogin, async (req, res) => {
    const collection = db.collection('questions');
    const { qid } = req.params;

    try {
        const result = await collection.findOne({ _id: new ObjectId(qid) });
        res.json({
            isLogin: true,
            output: result.question
        });
    } catch (error) {
        console.error(error);
    }
});

app.post('/login', async (req, res) => {
    const collection = db.collection('users');
    var user = req.body.user;
    var password = req.body.password;
    try {
        const result = await collection.findOne({ user: user, password: password });
        if (result == null) {
            res.json({ isLogin: false });
        }
        else {
            req.session.user = user;
            res.json({
                uid: result._id.toString(),
                isLogin: true
            });
        }
    } catch (error) {
        console.error(error);
    }
})

app.delete('/logout', async (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.json({ isLogin: false });
    }
})


app.post('/signup', async (req, res) => {
    const collection = db.collection('users');
    var user = req.body.user;
    var password = req.body.password;

    try {
        const result = await collection.findOne({ user: user });
        if (result == null) {
            await collection.insertOne({ user, password });
            res.json('Registration Successful')
        }
        else {
            res.json('Email Address is Already Registered')
        }
    } catch (error) {
        console.error(error);
    }
})

function isLogin(req, res, next) {
    if (req.session.user) {
        return next();
    }
    else {
        res.json({ isLogin: false });
    }
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
