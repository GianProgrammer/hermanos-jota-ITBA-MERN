import { useEffect, useState } from "react";

function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch(
        "https://hermanos-jota-itba-mern-34lp.onrender.com/api/mis-pedidos/mios",
        {
            headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }
        );
        const data = await res.json();
        setPedidos(Array.isArray(data) ? data : []); // evita error de map()
      } catch (error) {
        console.error("Error cargando pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) return <p>Cargando pedidos...</p>;

  if (pedidos.length === 0) {
    return <h2>No tenés pedidos todavía</h2>;
  }

  return (
    <div className="mis-pedidos-wrapper">
      <h2>🧾 Mis Pedidos</h2>

      {pedidos.map((pedido) => (
        <div key={pedido._id} className="pedido-card">
          <h3>Pedido #{pedido._id.slice(-6)}</h3>
          <p><b>Estado:</b> {pedido.estado}</p>
          <p><b>Total:</b> ${pedido.total.toLocaleString("es-AR")}</p>

          <h4>Productos:</h4>
          {pedido.productos.map((prod) => (
            <p key={prod._id}>
              {prod.quantity} × {prod.nombre} — $
              {(prod.precio * prod.quantity).toLocaleString("es-AR")}
            </p>
          ))}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default MisPedidos;
