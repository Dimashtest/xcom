const User = require('../models/usersModel')

const registerUser = async (req, res) => {
    try {
        const { email, firstName, password } = req.body
        const user = await User.create({ email, firstName, password })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { registerUser }