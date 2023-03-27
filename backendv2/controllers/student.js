const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const User = require("../models/User")
const Submission = require("../models/Submission")
const { spawn } = require("child_process")
const { ObjectId } = require("mongoose").Types;

const runCode = (code) => {
    return new Promise((resolve, reject) => {
        const python = spawn("python", ["-c", code]);

        let output = "";

        python.stdout.on("data", (data) => {
            output += data.toString();
        });

        python.stderr.on("data", (data) => {
            output += data.toString();
        });

        python.on("exit", (code) => {
            if (code === 0) {
                resolve(output);
            } else {
                reject(new ErrorResponse(`Child process exited with code ${code}`, 500));
            }
        });
    });
};

exports.submitCode = asyncHandler(async (req, res, next) => {
    const { userID, questionNumber } = req.params
    const { code } = req.body

    const result = await runCode(code)

    const submission = await Submission.create({
        userID,
        questionNumber,
        userSubmittedCode: code,
        codeResults: result
    })

    const update = { $push: { submissions: submission._id.toString() } }

    await User.findByIdAndUpdate(userID, update)

    res.status(200).json({ result: result })
})

exports.getSubmissions = asyncHandler(async (req, res, next) => {
    const { userID, questionNumber } = req.params

    const submissions = await Submission.find({
        userID: userID,
        questionNumber,
    });

    if (!submissions) {
        return next(
            new ErrorResponse(`Submissions not found`, 404)
        )
    }

    res.status(200).json({
        success: true,
        result: submissions
    });
});

exports.getOneSubmission = asyncHandler(async (req, res, next) => {
    const { userID, questionNumber, submissionID } = req.params

    const submission = await Submission.findOne({
        _id: new ObjectId(submissionID),
        userID: userID,
        questionNumber,
    });

    if (!submission) {
        return next(
            new ErrorResponse(`Submission ${submissionID} not found`, 404)
        )
    }

    res.status(200).json({
        success: true,
        result: submission
    });
});

exports.deleteOneSubmission = asyncHandler(async (req, res, next) => {
    const { userID, questionNumber, submissionID } = req.params

    const submission = await Submission.findOne({
        _id: new ObjectId(submissionID),
        userID: userID,
        questionNumber,
    });

    if (!submission) {
        return next(
            new ErrorResponse(`Submission ${submissionID} not found`, 404)
        )
    }

    await submission.remove();

    const update = { $pull: { submissions: submission._id.toString() } }

    await User.findByIdAndUpdate(userID, update)

    res.status(200).json({ success: true });
});