const mongoose = require("mongoose");
const MONGO_URL = "mongodb://localhost:27017/exerciseTracker";

async function connectMongo() {
  await mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Mongodb connected successfully");
    })
    .catch((err) => {
      console.log("Something went wrong while connecting to Mongo DB");
      console.log(err);
    });
}

module.exports = connectMongo;
