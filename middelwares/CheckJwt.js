const jwt = require('jsonwebtoken')

const checkJwt = (req, res, next) => {
    try {
        const token = req.headers.token;
        jwt.verify(token, process.env.SECRET)
        next()
    }
    catch (err) {
        res.status(400).json({ err})
    }
}
module.exports = checkJwt