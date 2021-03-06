require("dotenv").config();
const mongoose = require("mongoose");
const Item = require("../v1/models/ItemsModel");
const { seedProducts } = require("./seeds");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB and ready to seed!`);
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`);
  });

const seedDB = async () => {
  await Item.deleteMany({});
  await Item.insertMany(seedProducts);
};

seedDB().then(() => {
  console.log("Database seeded!");
  mongoose.connection.close();
});
