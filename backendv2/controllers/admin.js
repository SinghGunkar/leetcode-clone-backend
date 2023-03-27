const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Question = require("../models/Question")
const Submission = require("../models/Submission")
const User = require("../models/User")

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
        return next(
            new ErrorResponse(`Question ${questionNumber} not found`, 404)
        )
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
        return next(
            new ErrorResponse(`Question ${questionNumber} not found`, 404)
        )
    }

    await question.remove()

    const submissions = await Submission.find({ questionNumber })
    if (submissions) {
        await Submission.deleteMany({ questionNumber });
    }

    res.status(200).json({ success: true })
})
