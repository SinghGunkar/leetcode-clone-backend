const mongoose = require("mongoose")

const QuestionSchema = new mongoose.Schema({
    questionNumber: {
        type: Number,
        required: [true, "Please specify question number"]
    },
    questionContent: {
        type: String,
        required: [true, "Please specify question content/description"]
    }
})

module.exports = mongoose.model("Question", QuestionSchema)
