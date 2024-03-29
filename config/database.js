const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToDB;

// PORT=8001
// DB_URL="mongodb+srv://firebase:cEMIZQtuI4lmiYvD@cluster0.v6qkjfi.mongodb.net/?retryWrites=true&w=majority"
