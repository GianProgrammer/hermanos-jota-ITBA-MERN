import express from "express";
import cors from "cors";
import productosRouter from "./routes/productos.routes.js";
import contacto from "./routes/contacto.routes.js"; // ✅ NUEVO

const app = express();
const PORT = 5000;

// Middlewares globales
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`➡️ Petición recibida: ${req.method} ${req.url}`);
  next();
});

// Rutas principales
app.use("/api/productos", productosRouter);
app.use("/api/contacto", contacto); // ✅ NUEVO

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de error global
app.use((err, req, res, next) => {
  console.error("💥 Error interno:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
