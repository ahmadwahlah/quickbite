const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/user/create", async (req, res) => {
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
});

module.exports = router;
