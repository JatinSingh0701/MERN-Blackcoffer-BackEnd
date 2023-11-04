const router = require("express").Router();
const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const { sign } = require("jsonwebtoken");

// Router for signup
router.post("/signup", authController.signup);

// Router for login
router.post("/login", authController.login);

module.exports = router;
