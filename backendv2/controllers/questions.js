const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Question = require("../models/Question")
const Submission = require("../models/Submission")
const User = require("../models/User")

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
    const { questionTitle, questionContent } = req.body

    if (!questionTitle || !questionContent) {
        return next(
            new ErrorResponse(
                `Please provide questionTitle and questionContent`,
                404
            )
        )
    }

    const question = await Question.findById(questionID)

    if (!question) {
        return next(
            new ErrorResponse(`Question with id: ${questionID} not found`, 404)
        )
    }

    const updatedQuestion = await Question.findByIdAndUpdate(questionID, {
        questionTitle,
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

    // // delete the question
    await question.remove()

    // delete all submissions associated for that question
    const submissions = await Submission.find({ questionID })
    if (submissions) {
        await Submission.deleteMany({ questionID })
    }

    // remove foreign key(s) from user model
    const update = {
        $pull: { submissions: { questionID: questionID } }
    }
    await User.updateMany({}, update)

    res.status(200).json({
        success: true,
        data: `deleted question with id: ${questionID} and all of its relational data`
    })
})
