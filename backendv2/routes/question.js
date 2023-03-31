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
    protect,
    authorize("student", "admin"),
    getOneQuestion
)

router.get("/allQuestions", protect, authorize("student", "admin"), getAllQuestions)

router.post("/createQuestion", protect, authorize("admin"), createQuestion)
router.put(
    "/updateQuestion/:questionNumber",
    protect,
    authorize("admin"),
    updateQuestion
)
router.delete(
    "/deleteQuestion/:questionNumber",
    protect,
    authorize("admin"),
    deleteQuestion
)

module.exports = router
