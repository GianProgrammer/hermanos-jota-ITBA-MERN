// src/routes/productos.routes.js
import express from "express";
import Producto from "../models/producto.js";

const router = express.Router();

// Helper para igualdad case-insensitive segura
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

router.post("/check-nombre", async (req, res) => {
  try {
    const { nombre } = req.body || {};
    if (!nombre || !String(nombre).trim()) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const regex = new RegExp(`^${escapeRegex(String(nombre).trim())}$`, "i");
    const exists = await Producto.exists({ nombre: regex });
    return res.status(200).json({ exists: !!exists });
  } catch (error) {
    console.error("check-nombre error:", error);
    return res.status(500).json({ error: "Error interno al verificar el nombre" });
  }
});

// lista completa
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

// producto individual
router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
});

// agregar un nuevo producto
router.post("/", async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.precio != null) body.precio = Number(body.precio);

    const nuevoProducto = new Producto(body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    // Duplicado por índice único
    if (error?.code === 11000) {
      return res.status(409).json({ error: "Ya existe un producto con ese nombre" });
    }
    res.status(400).json({ error: "Error al crear el producto", details: error.message });
  }
});

// actualizar un producto
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = { ...req.body };
    if (body.precio != null) body.precio = Number(body.precio);

    // Si viene nombre, chequear colisión case-insensitive con otros docs
    if (body.nombre && String(body.nombre).trim()) {
      const regex = new RegExp(`^${escapeRegex(String(body.nombre).trim())}$`, "i");
      const conflict = await Producto.exists({ _id: { $ne: id }, nombre: regex });
      if (conflict) {
        return res.status(409).json({ error: "Ya existe un producto con ese nombre" });
      }
    }

    const productoActualizado = await Producto.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (productoActualizado) {
      res.json(productoActualizado);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ error: "Ya existe un producto con ese nombre" });
    }
    res.status(400).json({ error: "Error al actualizar el producto", details: error.message });
  }
});

// eliminar un producto
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (eliminado) {
      res.json({ mensaje: "Producto eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el producto" });
  }
});

export default router;

