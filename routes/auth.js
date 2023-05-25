const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/AuthController");
const verifyToken = require("../middleware/auth");

//@route POST /api/auth/register
//@desc Register user
//@access Public
router.get("/", verifyToken, AuthController.check);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;
