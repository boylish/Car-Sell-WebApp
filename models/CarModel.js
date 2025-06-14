import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
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

export default mongoose.models.Car || mongoose.model("Car", CarSchema);
