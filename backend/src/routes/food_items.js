const express = require("express");
const router = express.Router();

// @route POST api/food_items
// @desc fetching food items
// @access Public
router.post("/food_items", (req, res) => {
  try {
    // console.log(global.fetchedData);
    res.send(global.fetchedData);
  } catch (error) {
    if (error) throw error;
    return res.status(500).send(`Server Error: ${error.message}`);
  }
});

module.exports = router;
