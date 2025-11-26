import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productosRouter from "./routes/productos.routes.js";
import contacto from "./routes/contacto.routes.js"; 
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import Producto from "./models/producto.js";

dotenv.config()
const app = express();
const PORT = 5000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`➡️ Petición recibida: ${req.method} ${req.url}`);
  next();
});

// Rutas principales
app.use("/api/productos", productosRouter);
app.use("/api/contacto", contacto); 
app.use("/api/users", userRouter);

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use(cors({
  origin: "http://localhost:5000",
  credentials: true
}));
// Middleware de error global
app.use((err, req, res, next) => {
  console.error("Error interno:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

mongoose.connect(process.env.DB_URI)
.then(() => {
  console.log("Conectado a MongoDB");
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
})
.catch((err) => console.error("Error al conectar a MongoDB:", err));


await Producto.syncIndexes();
