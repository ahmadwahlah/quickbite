const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/order", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  let eId = await Order.findOne({ email: req.body.email });
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.status(200).json({ message: "Order Placed Successfully" });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.status(200).json({ message: "Order Placed Successfully" });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error", error.message);
    }
  }
});

module.exports = router;
