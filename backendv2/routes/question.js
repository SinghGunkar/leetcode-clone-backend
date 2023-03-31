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
    "/getQuestion/:questionID",
    protect,
    authorize("student", "admin"),
    getOneQuestion
)

router.get("/allQuestions", protect, authorize("student", "admin"), getAllQuestions)

router.post("/createQuestion", protect, authorize("admin"), createQuestion)
router.put(
    "/updateQuestion/:questionID",
    protect,
    authorize("admin"),
    updateQuestion
)
router.delete(
    "/deleteQuestion/:questionID",
    protect,
    authorize("admin"),
    deleteQuestion
)

module.exports = router
