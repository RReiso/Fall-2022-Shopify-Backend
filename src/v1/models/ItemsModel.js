const mongoose = require("mongoose");

const itemsModel = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String },
    warehouse: {
      type: String,
      required: true,
      enum: ["ABC123", "CDF456", "GHI789"],
    },
    isDeleted: { type: Boolean, default: false },
    deletionComments: { type: String, trim: true },
    money: {
      price: { type: Number, min: 0 },
      currency: { type: String, enum: ["USD", "CAD", "", "kk"] },
    },
    inStock: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemsModel);

module.exports = Item;
