import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productos: [
      {
        _id: String,
        nombre: String,
        precio: Number,
        quantity: Number,
      }
    ],
    total: Number,
    estado: {
      type: String,
      default: "Confirmado", // Primer estado
    },
  },
  { timestamps: true }
);

const Pedido = mongoose.model("Pedido", PedidoSchema);
export default Pedido;
