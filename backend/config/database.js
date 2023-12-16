const mongoose = require("mongoose");
const config = require("config");

const mongoURI = config.get("mongoURI");

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected!");

    // fetching data from mongoDB
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    try {
      global.fetchedData = await foodItemsCollection.find({}).toArray();
      // console.log(fetchedData);
    } catch (error) {
      if (error) throw error;
      return res.status(500).send(`Server Error: ${error.message}`);
    }
  } catch (error) {
    if (error) throw error;
    return res.status(500).send(`Server Error: ${error.message}`);
  }
};

module.exports = mongoDB;
