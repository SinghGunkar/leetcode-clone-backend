const express = require("express")
const {
    runCode,
    submitCode,
    getSubmissions,
    getOneSubmission,
    deleteOneSubmission
} = require("../controllers/submission")
const { protect, authorize } = require("../middleware/auth")

const router = express.Router()

router.post(
    "/runCode",
    protect,
    authorize("student", "admin"),
    runCode
)

router.post(
    "/submitCode/:userID/:questionID",
    protect,
    authorize("student", "admin"),
    submitCode
)

router.get(
    "/getSubmissions/:questionID",
    protect,
    authorize("admin"),
    getSubmissions
)

router.get(
    "/getOneSubmission/:userID/:questionID",
    protect,
    authorize("student", "admin"),
    getOneSubmission
)

router.delete(
    "/deleteOneSubmission/:userID/:questionID",
    protect,
    authorize("student", "admin"),
    deleteOneSubmission
)

module.exports = router
