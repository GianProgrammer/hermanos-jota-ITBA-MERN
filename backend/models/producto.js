// src/models/producto.js
import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  ruta: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  medidas: { type: String },
  materiales: { type: String },
  acabado: { type: String },
  precio: { type: Number, required: true }
});


const Producto = mongoose.model("Producto", productoSchema);
export default Producto;

