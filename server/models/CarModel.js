const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: String,
  kms: String,
  city: String,
  sellTime: String,
  variant: {
    fuel: String,
    transmission: String,
  },
  phone: String,
  email: String,
});

module.exports = mongoose.model("Car", carSchema);
