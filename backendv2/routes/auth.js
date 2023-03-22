const express = require("express")
const { signUp, login, logout, getLoggedInUser } = require("../controllers/auth")

const router = express.Router()

router.post("/signUp", signUp)
router.post("/login", login)
router.post("/logout", logout)
router.get("/getLoggedInUser/:userEmail", getLoggedInUser)

module.exports = router
