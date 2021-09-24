function methodNotAllowed(req, res, next) {
    return next({
        status: 405,
        message: `${req.method} not allowed for ${req.orinigalUrl}.`
    })
}

module.exports = { methodNotAllowed };