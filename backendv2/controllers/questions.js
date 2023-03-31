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

exports.createQuestion = asyncHandler(async (req, res, next) => {
    const { questionNumber, questionContent } = req.body

    await Question.create({ questionNumber, questionContent })

    res.status(200).json({
        success: true,
        message: `Successfully created question: ${questionNumber}: ${questionContent}`
    })
})

exports.updateQuestion = asyncHandler(async (req, res, next) => {
    const { questionNumber } = req.params
    const { questionContent } = req.body

    const question = await Question.findOne({ questionNumber })

    if (!question) {
        return next(new ErrorResponse(`Question ${questionNumber} not found`, 404))
    }

    await Question.updateOne({ questionNumber }, { questionContent })

    res.status(200).json({
        success: true,
        message: `Successfully updated question: ${questionNumber}: ${questionContent}`
    })
})

exports.deleteQuestion = asyncHandler(async (req, res, next) => {
    const { questionNumber } = req.params

    const question = await Question.findOne({ questionNumber })

    if (!question) {
        return next(new ErrorResponse(`Question ${questionNumber} not found`, 404))
    }

    await question.remove()

    const submissions = await Submission.find({ questionNumber })
    if (submissions) {
        await Submission.deleteMany({ questionNumber })
    }

    res.status(200).json({ success: true })
})
