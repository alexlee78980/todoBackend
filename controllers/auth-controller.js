const jwt = require('jsonwebtoken');
const User = require('../models/user');
const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Find user by username
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Compare password
		const match = await user.comparePassword(password);
		if (!match) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

		// Return token
		return res.json({ token });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Server error" });
	}
};

module.exports = { login };