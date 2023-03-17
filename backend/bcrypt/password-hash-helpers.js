var bcrypt = require("bcrypt")

const hashPassword = async password => {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

const comparePasswordToHashedPassword = async (plainPass, hashword) => {
    return await bcrypt.compare(plainPass, hashword)
}

module.exports = { hashPassword, comparePasswordToHashedPassword }
