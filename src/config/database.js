const mongoose = require("mongoose");

const mongodbConnectionUrl =
  "mongodb+srv://kajal:1920@cluster0.axsu5c0.mongodb.net/devTinder";

const connectDb = async () => {
  try {
    await mongoose.connect(mongodbConnectionUrl);
    console.log("mongodb connection established..");
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

module.exports = { connectDb };


