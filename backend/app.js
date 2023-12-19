const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

// connect DB
const mongoDB = require("./config/database.js");
mongoDB();

// cors policy
app.use(cors());

app.use(express.json());
app.use("/api", require("./src/routes/user"));
app.use("/api", require("./src/routes/food_items"));
app.use("/api", require("./src/routes/food_categories"));
app.use("/api", require("./src/routes/order"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
