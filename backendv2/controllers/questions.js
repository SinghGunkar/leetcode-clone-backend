const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Question = require("../models/Question")

exports.getAllQuestions = asyncHandler(async (req, res, next) => {
    const queryAll = {}
    const allQuestions = await Question.find(queryAll)

    res.status(200).json({
        success: true,
        data: allQuestions
    })
})

exports.getOneQuestion = asyncHandler(async (req, res, next) => {
    const questionNumber = req.params.questionNumber
    const queryOne = { questionNumber }
    const question = await Question.find(queryOne)

    if (!question || question.length < 1) {
        return next(
            new ErrorResponse(`Could not find question #${questionNumber}`, 401)
        )
    }

    res.status(200).json({
        success: true,
        data: question
    })
})
