const express = require("express");
const { signup, login } = require("../Controllers/UserController");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");

const router = express.Router();

router.post("/signupuser", signup);
router.post("/loginuser", login);

module.exports = router;
