require("dotenv").config();
const express = require("express");
const cors = require("cors");
const itemsRouter = require("./v1/routes/ItemsRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1/items", itemsRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
