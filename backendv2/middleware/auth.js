const jwt = require("jsonwebtoken")
const asyncHandler = require("./async")
const ErrorResponse = require("../utils/errorResponse")
const User = require("../models/User")

// wherever we include the protect middleware the user must be logged in to access that route
exports.protect = asyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // Set token from Bearer token in header
        indexOfToken = 1
        token = req.headers.authorization.split(" ")[indexOfToken]
        // Set token from cookie
    }
    // else if (req.cookies.token) {
    //   token = req.cookies.token;
    // }

    if (!token) {
        return next(
            new ErrorResponse(
                "Not authorized to access this route, missing Bearer token",
                401
            )
        )
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id

        req.user = await User.findById(userId)

        next()
    } catch (err) {
        return next(
            new ErrorResponse(
                "Not authorized to access this route, failed to verify Bearer token",
                401
            )
        )
    }
})

// granting access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `User role: ${req.user.role} is unauthorized to access this route`,
                    403
                )
            )
        }
        next()
    }
}
