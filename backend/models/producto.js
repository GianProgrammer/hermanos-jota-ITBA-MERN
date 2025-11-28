// src/models/producto.js
import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

const Producto = mongoose.model("Producto", productoSchema);
export default Producto;

