const { warehouses, currencies } = require("../../db/seeds");
const Item = require("../models/ItemsModel");

const getAll = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const { name, type, warehouse, inStock, money } = req.body;

  if (!name || !type || !warehouse || !inStock) {
    return res.status(400).send({
      error:
        "Missing one or more required fields: (name, type, warehouse, inStock)",
    });
  }

  if (inStock < 0) {
    return res.status(400).send({
      error: "The amount of items in stock must be greater or equal to 0",
    });
  }

  if (money && !money.price) {
    return res.status(400).send({
      error: "Missing price",
    });
  }

  if (money && !money.currency) {
    return res.status(400).send({
      error: "Missing currency",
    });
  }

  if (money && money.price < 0) {
    return res.status(400).send({
      error: "Price must be greater or equal to 0",
    });
  }

  if (!warehouses.includes(warehouse)) {
    return res.status(400).send({
      error: "Warehouse does not exist",
    });
  }

  if (money && !currencies.includes(money.currency)) {
    return res.status(400).send({
      error: `Wrong currency. Only ${currencies.join(", ")} allowed`,
    });
  }

  const newItem = new Item(req.body);

  try {
    const savedItem = await newItem.save();
    res
      .status(200)
      .json({ message: "Inventory item successfully added!", item: savedItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getByID = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(400).json({ error: "Item does not exist" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const options = { new: true };

    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ error: "Request body is empty. You must specify a field." });
    }

    const item = await Item.findById(id);

    if (!item) {
      return res.status(400).json({ error: "Item does not exist" });
    }

    if (item.isDeleted) {
      return res.status(400).json({ error: "Cannot update deleted item" });
    }

    if (updatedData.isDeleted) {
      return res
        .status(400)
        .json({ error: "Update not allowed for field 'isDeleted'" });
    }

    const result = await Item.findByIdAndUpdate(id, updatedData, options);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body, isDeleted: true };
    const options = { new: true };

    const result = await Item.findByIdAndUpdate(id, updatedData, options);

    if (!result) {
      return res.status(400).json({ error: "Item does not exist" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restore = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body, isDeleted: false };
    const options = { new: true };

    const result = await Item.findByIdAndUpdate(id, updatedData, options);

    if (!result) {
      return res.status(400).json({ error: "Item does not exist" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  create,
  getByID,
  update,
  destroy,
  restore,
};
