const express = require("express")
const { signUp, login, logout, deleteUser, getLoggedInUser, getAllUsers } = require("../controllers/user")
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
router.delete(
    "/deleteUser/:userID",
    protect,
    authorize("admin"),
    deleteUser)

router.get(
    "/getAllUsers",
    protect,
    authorize("admin"),
    getAllUsers
)

module.exports = router
