const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

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

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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
        return res.status(400).json({ errors: "Incorrect email!" });
      }

      if (userData.password !== req.body.password) {
        return res.status(400).json({ errors: "Incorrect Password" });
      }

      return res.status(200).json({ success: "Logged in successfully" });
    } catch (error) {
      console.log("Error logging in: ", error);
    }
  }
);

module.exports = router;
