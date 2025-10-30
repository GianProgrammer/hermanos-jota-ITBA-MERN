// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Producto from "./models/producto.js";
import productos from "./productos.js";

dotenv.config();

mongoose.connect(process.env.DB_URI)
  .then(async () => {
    console.log("Conectado a MongoDB");

    await Producto.deleteMany();
    await Producto.insertMany(productos); 

    console.log("Productos insertados");
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error:", err));