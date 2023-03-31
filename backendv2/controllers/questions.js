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
    const questionID = req.params.questionID
    const question = await Question.findById(questionID)

    if (!question || question.length < 1) {
        return next(
            new ErrorResponse(`Could not find question with id: ${questionID}`, 401)
        )
    }

    res.status(200).json({
        success: true,
        data: question
    })
})

exports.createQuestion = asyncHandler(async (req, res, next) => {
    const { questionTitle, questionContent } = req.body

    const newQuestion = await Question.create({ questionTitle, questionContent })

    res.status(200).json({
        success: true,
        data: newQuestion
    })
})

exports.updateQuestion = asyncHandler(async (req, res, next) => {
    const { questionID } = req.params
    const { questionContent } = req.body

    const question = await Question.findById(questionID)

    if (!question) {
        return next(
            new ErrorResponse(`Question with id: ${questionNumber} not found`, 404)
        )
    }

    const updatedQuestion = await Question.findByIdAndUpdate(questionID, {
        questionContent
    })

    res.status(200).json({
        success: true,
        data: updatedQuestion
    })
})

exports.deleteQuestion = asyncHandler(async (req, res, next) => {
    const { questionID } = req.params

    const question = await Question.findById(questionID)

    if (!question) {
        return next(
            new ErrorResponse(`Question with id: ${questionID} not found`, 404)
        )
    }

    await question.remove()

    // toDo
    const submissions = await Submission.find({ questionNumber })
    if (submissions) {
        await Submission.deleteMany({ questionNumber })
    }

    res.status(200).json({ success: true })
})
