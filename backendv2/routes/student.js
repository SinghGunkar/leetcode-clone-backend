const express = require("express")
const { submitCode, getSubmissions, getOneSubmission, deleteOneSubmission } = require("../controllers/student")
const { protect, authorize } = require("../middleware/auth")

const router = express.Router()

router.post(
    "/submitCode/:userID/:questionNumber",
    protect,
    authorize("student", "admin"),
    submitCode
)

router.get(
    "/getSubmissions/:userID/:questionNumber",
    protect,
    authorize("student", "admin"),
    getSubmissions
)

router.get(
    "/getOneSubmission/:userID/:questionNumber/:submissionID",
    protect,
    authorize("student", "admin"),
    getOneSubmission
)

router.delete(
    "/deleteOneSubmission/:userID/:questionNumber/:submissionID",
    protect,
    authorize("student", "admin"),
    deleteOneSubmission
)

module.exports = router
