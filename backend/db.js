const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://ahmadwahlah:p2NCuVaxtrvVS8RR@cluster0.boxyfrz.mongodb.net/?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = mongoDB;
