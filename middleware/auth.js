const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')
const { UnauthenticatedError } = require('../errors/index')

const authMiddleware = async (req, res, next) => {
    const accessToken = req.headers.authorization
    if (!accessToken || !accessToken.startsWith('Bearer ')) {
        throw new UnauthenticatedError('User is unauthorized')
    }

    const token = accessToken.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
        next()
    } catch (e) {
        throw new UnauthenticatedError('User is not authorized to access this route')
    }
}

module.exports = authMiddleware