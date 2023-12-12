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
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
      });

      res.json({ success: true });
    } catch (error) {
      console.log("Error creating user: ", error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
