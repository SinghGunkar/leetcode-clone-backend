const crypto = require("crypto")
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const User = require("../models/User")
const Submission = require("../models/Submission")

exports.signUp = asyncHandler(async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body

    const user = await User.findOne({ email })

    if (user) {
        return next(new ErrorResponse("Email already in use", 401))
    }

    if (!password || !confirmPassword) {
        return next(
            new ErrorResponse("Please enter a password and confirmPassword", 401)
        )
    }

    if (password != confirmPassword) {
        return next(
            new ErrorResponse("Password and confirm password do not match", 401)
        )
    }

    const newUser = await User.create({
        name,
        email,
        password
    })

    sendTokenResponse(newUser, 200, res)
})

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400))
    }

    // "+password" includes the password when querying database
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401))
    }

    const isPasswordMatch = await user.matchPassword(password)

    if (!isPasswordMatch) {
        return next(new ErrorResponse("Invalid credentials", 401))
    }

    sendTokenResponse(user, 200, res)
})

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        data: {}
    })
})

exports.getLoggedInUser = asyncHandler(async (req, res, next) => {
    // req.user is set in the middleware/auth.js protect function
    res.status(200).json({
        success: true,
        data: req.user
    })
})

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    if (process.env.NODE_ENV === "production") {
        options.secure = true
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token
    })
}

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const { userID } = req.params
    const user = await User.findById(userID)

    if (!user) {
        return next(
            new ErrorResponse(`Question with id: ${userID} not found`, 404)
        )
    }

    await user.remove()

    const submissions = await Submission.find({ userID })
    if (submissions) {
        await Submission.deleteMany({ userID })
    }

    res.status(200).json({ success: true })
})

exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find({ role: "student" }, "name email")
    res.status(200).json({ users: users })
})