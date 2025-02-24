const User = require('../models/usersModel')

const registerUser = async (req, res) => {
    try {
        const { email, first_name, password } = req.body
        const user = await User.create({ email, first_name, password })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Запрос на логин получен: " , email, password)

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { registerUser, loginUser }