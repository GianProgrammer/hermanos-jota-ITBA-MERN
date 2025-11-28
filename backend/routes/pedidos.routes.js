// routes/pedido.routes.js
import express from "express";
import Pedido from "../models/pedido.js";
import { authenticateToken } from "../middleware/authentication.js";

const router = express.Router();

// Crear un pedido
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { productos, total } = req.body;

    const nuevoPedido = new Pedido({
      userId: req.user.id,
      productos,
      total,
      estado: "Confirmado",
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
    const pedidos = await Pedido.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(pedidos);

  } catch (error) {
    console.error("❌ Error obteniendo pedidos:", error);
    res.status(500).json({ message: "Error obteniendo pedidos" });
  }
});

export default router;
