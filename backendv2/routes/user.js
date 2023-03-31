const express = require("express")
const { signUp, login, logout, getLoggedInUser } = require("../controllers/user")
const { protect, authorize } = require("../middleware/auth")

const router = express.Router()

router.post("/signUp", signUp)
router.post("/login", login)
router.post("/logout", logout)
router.get(
    "/getLoggedInUser",
    protect,
    authorize("student", "admin"),
    getLoggedInUser
)

module.exports = router
