const express = require("express");
const router = express.Router();
const { ItemsController } = require("../controllers");

// List all inventory items
router.get("/", ItemsController.getAll);

// Create new inventory item
router.post("/", ItemsController.create);

// Update inventory item
router.put("/:id", ItemsController.update);

// Delete inventory item
router.put("/:id/delete", ItemsController.destroy);

// Restore inventory item
router.put("/:id/restore", ItemsController.restore);

module.exports = router;
