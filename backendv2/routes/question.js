const express = require("express")
const { getAllQuestions, getOneQuestion } = require("../controllers/questions")
const { protect, authorize } = require("../middleware/auth")

const router = express.Router()

router.get(
    "/getQuestion/:questionNumber",
    // protect,
    // authorize("student", "admin"),
    getOneQuestion
)

router.get("/allQuestions", getAllQuestions)

module.exports = router
