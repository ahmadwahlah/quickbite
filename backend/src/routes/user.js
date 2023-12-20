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
    check("name", "Name must be 3 Characters").isLength({ min: 3 }),
    check("email", "Incorrect Email").isEmail(),
    check("password", "Incorrect Password Length").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const plainPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPassword, salt);

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        location: req.body.location,
      });

      res.json({ success: true });
    } catch (error) {
      console.log("Error creating user: ", error);
      res.json({ success: false });
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
