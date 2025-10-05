import express from "express";
import cors from "cors";
import productosRouter from "./routes/productos.routes.js";

const app = express();
const PORT = 5000;

// Middleware global
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`➡️ Petición recibida: ${req.method} ${req.url}`);
  next();
});

// Rutas principales
app.use("/api/productos", productosRouter);

// Middleware 404 - rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error("💥 Error interno:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
