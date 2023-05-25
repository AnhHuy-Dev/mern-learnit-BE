const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthController {
	//GET /
	async check(req, res, next) {
		try {
			const user = await User.findById(req.userId);
			if (!user) return res.status(400).json({ success: false, message: "User not found" });
			res.json({ success: true, user });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//POST /register
	async register(req, res, next) {
		//check fox existing user
		const { username, password } = req.body;
		if (!username || !password) return res.status(400).json({ success: false, message: "Missing username and/or password" });

		try {
			const user = await User.findOne({ username });
			if (user) return res.status(400).json({ success: false, message: "Duplicate username" });

			//all goood
			const hashedPassword = await argon2.hash(password); //hash password
			const newUser = new User({ username, password: hashedPassword });
			await newUser.save();

			//Return token
			const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
			res.json({ success: true, message: "User create successfully!", accessToken });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//POST /login
	async login(req, res, next) {
		const { username, password } = req.body;
		if (!username || !password) return res.status(400).json({ success: false, message: "Missing username and/or password" });

		try {
			const user = await User.findOne({ username });
			if (!user) return res.status(400).json({ success: false, message: "Incorrect username" });

			//check pass
			const checkPassword = await argon2.verify(user.password, password);
			if (!checkPassword) return res.status(400).json({ success: false, message: "Incorrect password" });

			//All good
			//Return token
			const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
			res.json({ success: true, message: "Loggesd in successfully!", accessToken });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}
}

module.exports = new AuthController();
