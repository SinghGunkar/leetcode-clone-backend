const express = require("express")
const { protect, authorize } = require("../middleware/auth")
const { createQuestion, updateQuestion, deleteQuestion } = require("../controllers/admin")
const router = express.Router()

router.post("/createQuestion", protect, createQuestion)
router.put('/updateQuestion/:questionNumber', protect, updateQuestion)
router.delete('/deleteQuestion/:questionNumber', protect, deleteQuestion)

module.exports = router
