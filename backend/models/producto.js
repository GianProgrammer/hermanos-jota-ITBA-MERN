import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  ruta: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  medidas: { type: String },
  materiales: { type: String },
  acabado: { type: String },
  peso: { type: String },
  capacidad: { type: String },
  modulares: { type: String },
  tapizado: { type: String },
  confort: { type: String },
  rotacion: { type: String },
  garantia: { type: String },
  cargaMaxima: { type: String },
  almacenamiento: { type: String },
  caracteristicas: { type: String },
  colchon: { type: String },
  estructura: { type: String },
  relleno: { type: String },
  sostenibilidad: { type: String },
  extension: { type: String },
  incluye: { type: String },
  cables: { type: String },
  regulacion: { type: String },
  certificacion: { type: String },
  precio: { type: Number, required: true },
}, { timestamps: true });

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;
