const isLogin = (req, res, next) => {
    if (req.session.user) {
        return next()
    } else {
        return next()
        res.json({ isLogin: false })
    }
}

module.exports = { isLogin }
