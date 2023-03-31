const express = require("express")
const {
    getAllQuestions,
    getOneQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require("../controllers/questions")
const { protect, authorize } = require("../middleware/auth")

const router = express.Router()

router.get(
    "/getQuestion/:questionNumber",
    // protect,
    // authorize("student", "admin"),
    getOneQuestion
)

router.get("/allQuestions", getAllQuestions)

router.post("/createQuestion", protect, createQuestion)
router.put("/updateQuestion/:questionNumber", protect, updateQuestion)
router.delete("/deleteQuestion/:questionNumber", protect, deleteQuestion)

module.exports = router
