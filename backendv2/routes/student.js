const express = require("express")
const { submitCode } = require("../controllers/student")
const { protect, authorize } = require("../middleware/auth")

const router = express.Router()

router.post(
    "/submitCode/:userID/:questionNumber",
    protect,
    authorize("student", "admin"),
    submitCode
)

module.exports = router
