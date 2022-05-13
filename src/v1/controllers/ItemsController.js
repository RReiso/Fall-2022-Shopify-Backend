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

const getByID = (req, res) => {
  res.send("getbyid");
};

const update = (req, res) => {
  res.send("update");
};

const destroy = (req, res) => {
  res.send("destroy");
};

const restore = (req, res) => {
  res.send("restore");
};

module.exports = {
  getAll,
  create,
  getByID,
  update,
  destroy,
  restore,
};
