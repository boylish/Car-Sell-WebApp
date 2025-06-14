const express = require("express");
const router = express.Router();
const Car = require("../models/CarModel");

router.post("/add", async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json({ message: "Car added", car });
  } catch (error) {
    res.status(500).json({ error: "Failed to add car" });
  }
});

module.exports = router;
