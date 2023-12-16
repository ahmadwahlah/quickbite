const express = require("express");
const router = express.Router();

// @route POST api/food_categories
// @desc fetching food category
// @access Public
router.post("/food_categories", (req, res) => {
  try {
    // console.log(global.fetchedCategoriesData);
    res.send(global.fetchedCategoriesData);
  } catch (error) {
    if (error) throw error;
    return res.status(500).send(`Server Error: ${error.message}`);
  }
});

module.exports = router;
