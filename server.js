require("dotenv").config();
const express = require("express");
const connectDB = require("./src/db/conn");
const cors = require("cors");
const apicache = require("apicache");
const itemsRouter = require("./src/v1/routes/ItemsRouter");
const path = require("path");
const { warehouses, currencies } = require("./src/db/seeds");
const Item = require("./src/v1/models/ItemsModel");

const app = express();
const cache = apicache.middleware;
app.set("view engine", "ejs");
connectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV !== "testing") {
  app.use(cache("2 minutes"));
}
app.use("/api/v1/items", itemsRouter);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  let items;
  let error;
  try {
    items = await Item.find({ isDeleted: false });
  } catch (err) {
    error = err.message;
  }
  res.render("home", {
    warehouses,
    currencies,
    items,
    error,
  });
});

app.get("/deleted", async (req, res) => {
  let deletedItems;
  let error;
  try {
    deletedItems = await Item.find({ isDeleted: true });
  } catch (err) {
    error = err.message;
  }
  res.render("deletedItems", {
    warehouses,
    currencies,
    items: deletedItems,
    error,
  });
});

app.get("*", async (req, res) => {
  res.status(404).send("Page does not exist!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
