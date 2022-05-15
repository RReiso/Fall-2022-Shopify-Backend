require("dotenv").config();
const express = require("express");
const connectDB = require("./src/db/conn");
const cors = require("cors");
const itemsRouter = require("./src/v1/routes/ItemsRouter");
const path = require("path");
const { warehouses, currencies } = require("./src/db/seeds");
const Item = require("./src/v1/models/ItemsModel");
console.log("Item", Item);

const app = express();
app.set("view engine", "ejs");
connectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1/items", itemsRouter);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  let items;
  let error;
  try {
    items = await Item.find();
  } catch (err) {
    error = err.message;
  }
  res.render("index", {
    warehouses,
    currencies,
    items,
    error,
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
