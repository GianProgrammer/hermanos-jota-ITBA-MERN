// server.js
import express from "express";
import cors from "cors";
import productos from "./src/components/productos.js"; // ajustá la ruta según dónde esté tu archivo

const app = express();
const PORT = 5000;

app.use(cors()); // permite que el frontend haga fetch

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
