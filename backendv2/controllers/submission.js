const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const User = require("../models/User")
const Question = require("../models/Question")
const Submission = require("../models/Submission")
const { spawn } = require("child_process")
const { ObjectId } = require("mongoose").Types

const runCode = code => {
    return new Promise((resolve, reject) => {
        const python = spawn("python", ["-c", code])

        let output = ""

        python.stdout.on("data", data => {
            output += data.toString()
        })

        python.stderr.on("data", data => {
            output += data.toString()
        })

        python.on("exit", code => {
            if (code === 0) {
                resolve(output)
            } else {
                reject(
                    new ErrorResponse(`Child process exited with code ${code}`, 500)
                )
            }
        })
    })
}

exports.runCode = asyncHandler(async (req, res, next) => {
    const { code } = req.body
    const result = await runCode(code)
    res.status(200).json({ result: result })
})

exports.submitCode = asyncHandler(async (req, res, next) => {
    const { userID, questionID } = req.params
    const { code } = req.body

    const user = await User.findById(userID)

    if (!user) {
        return next(new ErrorResponse(`User with id: ${userID} does not exist`, 404))
    }

    const question = await Question.findById(questionID)

    if (!question) {
        return next(
            new ErrorResponse(`Question with id: ${questionID} does not exist`, 404)
        )
    }

    const result = await runCode(code)

    const submission = await Submission.findOne({
        userID,
        questionID
    })

    if (!submission) {
        const newSubmission = await Submission.create({
            userID,
            questionID,
            userSubmittedCode: code,
            codeResults: result
        })
        const submissionID = newSubmission._id.toString()
        const update = { $push: { submissions: { submissionID, questionID } } }

        await User.findByIdAndUpdate(userID, update)
    }
    else {
        submission.userSubmittedCode = code
        submission.codeResults = result
        await submission.save()
    }

    res.status(200).json({ result: result })
})

exports.getSubmissions = asyncHandler(async (req, res, next) => {
    const { questionID } = req.params

    const question = await Question.findById(questionID)

    if (!question) {
        return next(
            new ErrorResponse(`Question with id: ${questionID} does not exist`, 404)
        )
    }

    const submissions = await Submission.find({ questionID }, "codeResults").populate("questionID userID", "questionTitle questionContent name email")

    if (!submissions) {
        return next(new ErrorResponse(`Submissions not found`, 404))
    }

    res.status(200).json({
        success: true,
        result: submissions
    })
})

exports.getOneSubmission = asyncHandler(async (req, res, next) => {
    const { userID, questionID, submissionID } = req.params

    const submission = await Submission.findOne({
        _id: new ObjectId(submissionID),
        userID: new ObjectId(userID),
        questionID: new ObjectId(questionID)
    }).populate("questionID userID", "questionTitle questionContent name email")

    if (!submission) {
        return next(new ErrorResponse(`Submission ${submissionID} not found`, 404))
    }

    res.status(200).json({
        success: true,
        result: submission
    })
})

exports.deleteOneSubmission = asyncHandler(async (req, res, next) => {
    const { userID, questionID, submissionID } = req.params

    const user = await User.findById(userID)

    if (!user) {
        return next(new ErrorResponse(`User with id: ${userID} does not exist`, 404))
    }

    const question = await Question.findById(questionID)

    if (!question) {
        return next(
            new ErrorResponse(`Question with id: ${questionID} does not exist`, 404)
        )
    }

    const submission = await Submission.findById(submissionID)

    if (!submission) {
        return next(new ErrorResponse(`Submission ${submissionID} not found`, 404))
    }

    await submission.remove()

    // remove foreign key(s) from user model
    const update = {
        $pull: { submissions: { submissionID: submissionID } }
    }

    await User.findByIdAndUpdate(userID, update)

    res.status(200).json({
        success: true,
        data: `deleted submission with id: ${submissionID} from user: ${userID}`
    })
})
