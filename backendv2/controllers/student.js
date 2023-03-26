const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const User = require("../models/User")
const Submission = require("../models/Submission")

exports.submitCode = asyncHandler(async (req, res, next) => {
    const userID = req.params.userID
    const questionNumber = req.params.questionNumber
    const { code } = req.body

    // run code and get results <const results = runCode(code)>
    const results = "results of code here"

    const submission = await Submission.create({
        userID,
        questionNumber,
        userSubmittedCode: code,
        codeResults: results
    })

    const update = { $push: { submissions: submission._id.toString() } }

    await User.findByIdAndUpdate(userID, update)

    res.json({ test: "test" })
})
