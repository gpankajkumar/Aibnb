const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connection successful");
}

main().catch((err) => {
  console.log("Connection error:", err);
});

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    const listingsWithOwner = initData.data.map((obj) => ({
      ...obj,
      owner: "684bd3f8ded5b7465d167637",
      image: obj.image || "", 
    }));
    await Listing.insertMany(listingsWithOwner);
    console.log("Data was initialized");
  } catch (err) {
    console.log("Initialization error:", err);
  }
};

initDB();