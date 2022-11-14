const jwt = require('jsonwebtoken')
const {BadRequest} = require('../errors/index')

const login = async (req, res) => {
    const {username, password} = req.body
//    just for demo? normally provide by DB
    const id = new Date().getDate()

    if (!username || !password) {
        throw new BadRequest('Please provide email and password')
    }

    const token = jwt.sign(
        {id, username},
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    )
    res.status(200).json({msg: 'User created', token})
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your auth data, your lucky number is ${luckyNumber}`
    })
}

module.exports = {login, dashboard}