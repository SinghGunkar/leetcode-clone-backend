const express = require("express")
const {
    submitCode,
    getSubmissions,
    getOneSubmission,
    deleteOneSubmission
} = require("../controllers/submission")
const { protect, authorize } = require("../middleware/auth")

const router = express.Router()

router.post(
    "/submitCode/:userID/:questionID",
    protect,
    authorize("student", "admin"),
    submitCode
)

router.get(
    "/getSubmissions/:userID/:questionID",
    protect,
    authorize("student", "admin"),
    getSubmissions
)

router.get(
    "/getOneSubmission/:userID/:questionID/:submissionID",
    protect,
    authorize("student", "admin"),
    getOneSubmission
)

router.delete(
    "/deleteOneSubmission/:userID/:questionID/:submissionID",
    protect,
    authorize("student", "admin"),
    deleteOneSubmission
)

module.exports = router
