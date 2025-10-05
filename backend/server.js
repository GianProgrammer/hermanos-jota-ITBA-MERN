// server.js
import express from "express";
import cors from "cors";
import productos from "./productos.js"; // ajustá la ruta según dónde esté tu archivo

const app = express();
const PORT = 5000;

app.use(cors()); // permite que el frontend haga fetch
app.use(express.json())

app.use((req, res, next) => {
  console.log(`Petición recibida: ${req.method} ${req.url}`);
  next(); // sigue al siguiente middleware o ruta
});

// Endpoint que devuelve todos los productos
app.get("/api/productos", (req, res) => {
  res.json(productos);
});

// Endpoint para un producto específico (ejemplo: /api/productos/3)
app.get("/api/productos/:id", (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
