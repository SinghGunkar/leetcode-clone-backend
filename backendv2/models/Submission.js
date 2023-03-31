const mongoose = require("mongoose")

const SubmissionSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: [true, "Please specify a userID"]
    },
    questionID: {
        type: String,
        required: [true, "Please specify question number"]
    },
    userSubmittedCode: {
        type: String,
        required: [true, "Please submit some code"]
    },
    codeResults: {
        type: String
    }
})

module.exports = mongoose.model("Submission", SubmissionSchema)
