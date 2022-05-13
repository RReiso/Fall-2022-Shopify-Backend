const mongoose = require("mongoose");

const itemsModel = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    type: { type: String, required: true },
    description: { type: String },
    warehouse: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    deletionComments: { type: String, trim: true },
    money: { price: { type: Number, min: 0 }, currency: { type: String } },
    inStock: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemsModel);

module.exports = Item;
