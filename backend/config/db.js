const mongoose = require("mongoose");
const { MONGOURL } = require("./key");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
