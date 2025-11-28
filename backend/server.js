import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productosRouter from "./routes/productos.routes.js";
import contacto from "./routes/contacto.routes.js"; 
import userRouter from "./routes/user.routes.js";
import pedidosRouter from "./routes/pedidos.routes.js";
import cookieParser from "cookie-parser";
import Producto from "./models/producto.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS (SOLO UNA VEZ)
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// 👇 LOG DE PETICIONES
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// 🚀 Rutas principales
app.use("/api/productos", productosRouter);
app.use("/api/contacto", contacto);
app.use("/api/users", userRouter);
app.use("/api/mis-pedidos", pedidosRouter);


// Middleware 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de error
app.use((err, req, res, next) => {
  console.error("Error interno:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

// 🟢 Conexión a MongoDB + Server
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

await Producto.syncIndexes();
