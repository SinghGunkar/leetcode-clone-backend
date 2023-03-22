const crypto = require("crypto")
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const User = require("../models/User")

exports.signUp = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    // Check for user
    const user = await User.findOne({ email })

    if (user) {
        return next(new ErrorResponse("Email already in use", 401))
    }

    const newUser = await User.create({
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
    const user = await User.find({ email: req.params.userEmail })

    res.status(200).json({
        success: true,
        data: user
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