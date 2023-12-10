const express = require("express");
const app = express();
const port = 8080;

// connect DB
const mongoDB = require("./config/database.js");
mongoDB();

app.use(express.json());
app.use("/api", require("./src/routes/user"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
