// routes/pedido.routes.js
import express from "express";
import Pedido from "../models/pedido.js";
import { authenticateToken } from "../middleware/authentication.js";
import { isAdmin } from "../middleware/authorization.js";

const router = express.Router();

// Crear un pedido
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { productos, total } = req.body;
    console.log("📦 Productos recibidos en el backend:");
    console.log(JSON.stringify(productos, null, 2));
    
      // 🛠 Normalización
      const productosNormalizados = productos.map((p) => ({
        _id: p._id,
        nombre: p.nombre || p.name,     // aceptar ambos
        precio: p.precio || p.price,    // aceptar ambos
        quantity: p.quantity
      }));

      const nuevoPedido = new Pedido({
        userId: req.user.id,
        productos: productosNormalizados,
        total,
        estado: "Confirmado"
      });

    const saved = await nuevoPedido.save();
    res.status(201).json(saved);

  } catch (error) {
    console.error("❌ Error creando pedido:", error);
    res.status(500).json({ message: "Error al crear el pedido" });
  }
});


// Obtener pedidos del usuario
router.get("/mios", authenticateToken, async (req, res) => {
  try {

    // 🛑 Si el token está mal, detener ejecución
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const pedidos = await Pedido.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(pedidos);

  } catch (error) {
    console.error("❌ Error obteniendo pedidos:", error);
    res.status(500).json({ message: "Error obteniendo pedidos" });
  }
});


// Obtener todos los pedidos (ADMIN)
router.get("/todos", authenticateToken, isAdmin, async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    res.json(pedidos);

  } catch (error) {
    console.error("Error obteniendo pedidos:", error);
    res.status(500).json({ message: "Error obteniendo pedidos" });
  }
});



export default router;
