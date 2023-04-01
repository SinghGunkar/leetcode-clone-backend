const crypto = require("crypto")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ],
        validate: {
            validator: function (v) {
                return v.endsWith("@sfu.ca")
            },
            message: props => `Email: ${props.value} must end in @sfu.ca`
        }
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [15, "Password must be less than 15 characters long"],
        select: false // don't return the password when querying database
    },
    submissions: [
        {
            submissionID: {
                type: String,
                required: [true, "Please enter a submissionID"]
            },
            questionID: {
                type: String,
                required: [true, "Please enter a questionID"]
            }
        }
    ],
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", UserSchema)
