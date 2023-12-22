const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// @route POST api/user/create
// @desc creating new user
// @access Public

router.post(
  "/user/create",
  [
    check("email", "Invalid email address").isEmail(),
    check("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // Validation failed
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, location } = req.body;
      const plainPassword = req.body.password;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        // User with the given email already exists
        return res
          .status(400)
          .json({ errors: [{ msg: "User with this email already exists" }] });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(plainPassword, salt);

      const newUser = new User({
        name,
        email,
        password: hash,
        location,
      });

      await newUser.save();

      res.json({ success: true });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

// @route POST api/user/login
// @desc login user
// @access Public

router.post(
  "/user/login",
  [
    check("email", "Email is incorrect").isEmail(),
    check("password", "Password is incorrect").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let email = req.body.email;
      const userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: [{ msg: "Incorrect email!" }] });
      }

      const isMatch = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Incorrect password" }] });
      }

      const payload = {
        user: {
          id: userData.id,
          email: userData.email,
        },
      };

      const authToken = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 420000,
      });

      return res.status(200).json({
        success: "Logged in successfully",
        authToken: authToken,
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res
        .status(500)
        .send("Server Error: Unable to process your request");
    }
  }
);

module.exports = router;
