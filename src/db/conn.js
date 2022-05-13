const mongoose = require("mongoose");
let database = process.env.MONGO_URI;

// When running tests, connect to testing database in MongoDB
if (process.env.NODE_ENV === "testing") {
  database = process.env.MONGO_URI_TEST;
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to MongoDB!`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
