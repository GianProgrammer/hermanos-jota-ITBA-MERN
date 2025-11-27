// src/routes/productos.routes.js
import express from "express";
import Producto from "../models/producto.js";

const router = express.Router();

// Helper para igualdad case-insensitive segura
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ----- Helper para resolver por _id O por id -----
async function findProductoByAnyId(identificador) {
  let producto = null;

  // Si parece un ObjectId (24 chars hex), primero pruebo por _id
  if (/^[0-9a-fA-F]{24}$/.test(identificador)) {
    producto = await Producto.findById(identificador);
  }

  // Si no encontré nada, pruebo por el campo id (tu código de producto)
  if (!producto) {
    producto = await Producto.findOne({ id: identificador });
  }

  return producto;
}

// ---------- check nombre ----------
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
    return res
      .status(500)
      .json({ error: "Error interno al verificar el nombre" });
  }
});

// ---------- lista completa ----------
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

// ---------- obtener un producto por _id o id ----------
router.get("/:identificador", async (req, res) => {
  try {
    const { identificador } = req.params;

    const producto = await findProductoByAnyId(identificador);

    if (producto) {
      return res.json(producto);
    }
    return res.status(404).json({ error: "Producto no encontrado" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "ID inválido" });
  }
});

// ---------- agregar un nuevo producto ----------
router.post("/", async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.precio != null) body.precio = Number(body.precio);

    const nuevoProducto = new Producto(body);
    await nuevoProducto.save();
    return res.status(201).json(nuevoProducto);
  } catch (error) {
    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ error: "Ya existe un producto con ese nombre" });
    }
    console.error(error);
    return res.status(400).json({
      error: "Error al crear el producto",
      details: error.message,
    });
  }
});

// ---------- actualizar un producto por _id o id ----------
router.put("/:identificador", async (req, res) => {
  try {
    const { identificador } = req.params;
    const body = { ...req.body };
    if (body.precio != null) body.precio = Number(body.precio);

    // primero resuelvo el documento real
    const producto = await findProductoByAnyId(identificador);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const idMongo = producto.id.toString();

    // Si viene nombre, chequear colisión case-insensitive con otros docs
    if (body.nombre && String(body.nombre).trim()) {
      const regex = new RegExp(
        `^${escapeRegex(String(body.nombre).trim())}$`,
        "i"
      );
      const conflict = await Producto.exists({
        _id: { $ne: idMongo },
        nombre: regex,
      });
      if (conflict) {
        return res
          .status(409)
          .json({ error: "Ya existe un producto con ese nombre" });
      }
    }

    const productoActualizado = await Producto.findByIdAndUpdate(
      idMongo,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.json(productoActualizado);
  } catch (error) {
    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ error: "Ya existe un producto con ese nombre" });
    }
    console.error(error);
    return res.status(400).json({
      error: "Error al actualizar el producto",
      details: error.message,
    });
  }
});

// ---------- eliminar un producto por _id o id ----------
router.delete("/:identificador", async (req, res) => {
  try {
    const { identificador } = req.params;

    const producto = await findProductoByAnyId(identificador);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await Producto.findByIdAndDelete(producto.id);

    return res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Error al eliminar el producto" });
  }
});

export default router;
