const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
var colors = require("colors")
const connectToDatabase = require("./config/database")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const errorHandler = require("./middleware/error")

dotenv.config({ path: "./config/config.env" })

connectToDatabase()

const authRoutes = require("./routes/auth")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

// development logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// mount routers
app.use("/authentication", authRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
)

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    server.close(() => process.exit(1))
})
