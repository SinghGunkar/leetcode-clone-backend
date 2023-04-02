const routeNotFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "The endpoint you are trying to access does not exist"
    })
}

module.exports = routeNotFound
