import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const API = "https://hermanos-jota-itba-mern-34lp.onrender.com/api/mis-pedidos/todos";

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchPedidos = async () => {
      const res = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // Validación
      if (!Array.isArray(data)) {
        console.error("⚠️ Respuesta inesperada del backend:", data);
        return;
      }

      setPedidos(data);
    };

    fetchPedidos();
  }, []);

  return (
    <div className="admin-container">
      <h1>Pedidos Recibidos</h1>

      {pedidos.length === 0 && <p>No hay pedidos aún.</p>}

      {pedidos.map((p) => (
        <div key={p._id} className="pedido-card">
          <h3>Pedido #{p._id}</h3>
          <p>Estado: {p.estado}</p>
          <p>Total: ${p.total}</p>
          <p>Fecha: {new Date(p.createdAt).toLocaleString()}</p>

          <h4>Productos:</h4>
          <ul>
            {p.productos.map((prod, i) => (
              <li key={i}>
                {prod.nombre} — Cant: {prod.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

