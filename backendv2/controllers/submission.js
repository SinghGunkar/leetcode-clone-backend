const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const User = require("../models/User")
const Question = require("../models/Question")
const Submission = require("../models/Submission")
const { spawn } = require("child_process")
const { ObjectId } = require("mongoose").Types

const codeSecurityCheck = code => {
    let temp_code = code.trim()

    temp_code = temp_code.replace(/ /g, "")

    temp_code = temp_code.toLowerCase()

    console.log("tpe:", temp_code)

    if (temp_code.includes("importos")) {
        return [false, "Not Allow To Use OS Module"]
    } else if (temp_code.includes("importplatform")) {
        return [false, "Not Allow To Use platform Module"]
    }

    return [true, null]
}

const runCode = (code, input) => {
    return new Promise((resolve, reject) => {
        const python = spawn("python", ["-c", code])

        let securityResult = codeSecurityCheck(code)
        if (!securityResult[0]) {
            reject(new ErrorResponse(securityResult[1].toString(), 500))
            return
        }

        let output = ""

        if (input) {
            python.stdin.write(input.toString() + "\n")
        }

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
                    new ErrorResponse(
                        `Child process exited with code ${code}\n` + `${output}`,
                        500
                    )
                )
            }
        })
    })
}

exports.runCode = asyncHandler(async (req, res, next) => {
    const { code, input } = req.body
    const result = await runCode(code, input)
    res.status(200).json({ result: result })
})

exports.submitCode = asyncHandler(async (req, res, next) => {
    const { userID, questionID } = req.params
    const { code, input } = req.body

    console.log(code)
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

    const result = await runCode(code, input)

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
    } else {
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

    const submissions = await Submission.find(
        { questionID },
        "codeResults"
    ).populate("questionID userID", "questionTitle questionContent name email")

    if (!submissions) {
        return next(new ErrorResponse(`Submissions not found`, 404))
    }

    res.status(200).json({
        success: true,
        result: submissions
    })
})

exports.getOneSubmission = asyncHandler(async (req, res, next) => {
    const { userID, questionID } = req.params

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

    const submission = await Submission.findOne({
        userID: new ObjectId(userID),
        questionID: new ObjectId(questionID)
    }).populate("questionID userID", "questionTitle questionContent name email")

    if (!submission) {
        return next(
            new ErrorResponse(`Submission for question ${questionID} not found`, 404)
        )
    }

    res.status(200).json({
        success: true,
        result: submission
    })
})

exports.deleteOneSubmission = asyncHandler(async (req, res, next) => {
    const { userID, questionID } = req.params

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

    const submission = await Submission.findOne({
        userID: new ObjectId(userID),
        questionID: new ObjectId(questionID)
    }).populate("questionID userID", "questionTitle questionContent name email")

    if (!submission) {
        return next(
            new ErrorResponse(`Submission for question ${questionID} not found`, 404)
        )
    }

    await submission.remove()

    // remove foreign key(s) from user model
    const update = {
        $pull: { submissions: { submissionID: submission._id } }
    }

    await User.findByIdAndUpdate(userID, update)

    res.status(200).json({
        success: true,
        data: `deleted submission for question ${questionID} from user: ${userID}`
    })
})
