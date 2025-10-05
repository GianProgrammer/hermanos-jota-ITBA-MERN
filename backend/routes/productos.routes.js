import express from "express";
import productos from "../productos.js";

const router = express.Router();

// GET /api/productos → lista completa
router.get("/", (req, res) => {
  res.json(productos);
});

// GET /api/productos/:id → producto individual
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

export default router;
