const mongoose = require("mongoose")

const connectDB = async () => {
    const userName = process.env.MONGO_USERNAME
    const password = process.env.MONGO_PASSWORD
    const mongoConnectionString = `mongodb+srv://${userName}:${password}@cmput-372.zarzqam.mongodb.net/?retryWrites=true&w=majority`

    // For testing purposes
    const mongoConnectionStringTest =
        "Replace me with your own connection string and change `mongoConnectionString` below to `mongoConnectionStringTest`"

    const connection = await mongoose.connect(mongoConnectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

    console.log(
        `MongoDB Connected: ${connection.connection.host}`.cyan.underline.bold
    )
}

module.exports = connectDB
