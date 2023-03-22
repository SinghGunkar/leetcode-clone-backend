const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
var colors = require("colors")
const connectToDatabase = require("./config/database")

dotenv.config({ path: "./config/config.env" })

connectToDatabase()

const app = express()

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}
