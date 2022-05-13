const mongoose = require("mongoose");

const itemsModel = mongoose.Schema(
  {
    name: { type: String, trim: true },
    description: { type: String },
    warehouse: { type: String },
    isDeleted: { type: Boolean, default: false },
    deletionComments: { type: String, trim: true },
    money: { price: { type: Number }, currency: { type: String } },
    inStock: { type: Number },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemsModel);

module.exports = Item;
