require("dotenv").config();
const express = require("express");
const connectDB = require("./src/db/conn");
const cors = require("cors");
const itemsRouter = require("./src/v1/routes/ItemsRouter");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
connectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1/items", itemsRouter);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
