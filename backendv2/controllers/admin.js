const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Question = require("../models/Question")

exports.createQuestion = asyncHandler(async (req, res, next) => {
    const { questionNumber, questionContent } = req.body

    await Question.create({ questionNumber, questionContent })

    res.status(200).json({
        success: true,
        message: `Successfully created question: ${questionNumber}: ${questionContent}`
    })
})
