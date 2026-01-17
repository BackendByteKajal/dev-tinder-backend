const mongoose = require("mongoose");

const mongodbConnectionUrl = process.env.MONGODB_CONNECTION_URL;
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
