const mongoose = require("mongoose")

const QuestionSchema = new mongoose.Schema({
    questionTitle: {
        type: String,
        required: [true, "Please specify a question title"]
    },
    questionContent: {
        type: String,
        required: [true, "Please specify question content/description"]
    }
})

module.exports = mongoose.model("Question", QuestionSchema)
