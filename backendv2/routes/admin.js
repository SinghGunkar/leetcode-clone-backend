const express = require("express")
const { protect, authorize } = require("../middleware/auth")
const { createQuestion } = require("../controllers/admin")
const router = express.Router()

router.post("/createQuestion", protect, createQuestion)

module.exports = router
