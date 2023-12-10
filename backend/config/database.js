const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://ahmadwahlah:p2NCuVaxtrvVS8RR@cluster0.boxyfrz.mongodb.net/quickbite?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected!");

    // fetching data from mongoDB
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    try {
      const fetchedData = await foodItemsCollection.find({}).toArray();
      // console.log(fetchedData);
    } catch (error) {
      console.error("Error fetching data from MongoDB:", error.message);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = mongoDB;
