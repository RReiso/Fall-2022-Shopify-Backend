const Item = require("../models/ItemsModel");

const getAll = (req, res) => {
  res.status(200).send({ message: "Inventory items" });
};

const create = (req, res) => {
  res.send("create");
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
