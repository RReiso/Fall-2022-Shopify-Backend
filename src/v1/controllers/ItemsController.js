const Item = require("../models/ItemsModel");

const getAll = async (req, res) => {
  try {
    const data = await Item.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
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

  if (money.price < 0) {
    return res.status(400).send({
      error: "Price must be greater or equal to 0",
    });
  }

  const data = new Item(req.body);

  try {
    const savedData = await data.save();
    res
      .status(200)
      .json({ message: "Inventory item successfully added!", item: savedData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getByID = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Item.findById(id);

    if (!data) {
      res.status(400).json({ error: "Item does not exist" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = (req, res) => {
  res.send("update");
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body, isDeleted: true };
    const options = { new: true };

    const result = await Item.findByIdAndUpdate(id, updatedData, options);

    if (!result) {
      res.status(400).json({ error: "Item does not exist" });
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
      res.status(400).json({ error: "Item does not exist" });
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
