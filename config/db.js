const config = require("./config");
const mongoose = require("mongoose");

const db = async () => {
  try {
    console.log();
    await mongoose.connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to db");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = db;
