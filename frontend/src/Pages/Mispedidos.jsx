import { useEffect, useState } from "react";
import "../styles/mispedidos.css";

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
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();
        setPedidos(Array.isArray(data) ? data : []);
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
      <h2 className="titulo-pedidos">🧾 Mis Pedidos</h2>

      {pedidos.map((pedido) => (
        <div key={pedido._id} className="pedido-card">
          <div className="pedido-header">
            <h3>Pedido #{pedido._id.slice(-6)}</h3>
            <span className="pedido-estado">{pedido.estado}</span>
          </div>

          <div className="pedido-total">
            Total: <b>${pedido.total.toLocaleString("es-AR")}</b>
          </div>

          <h4 className="subtitulo-productos">Productos:</h4>

          <div className="productos-lista">
            {pedido.productos.map((prod) => {
              const name = prod.name || prod.nombre || "Producto";
              const price = prod.price ?? prod.precio ?? 0;
              const qty = prod.quantity ?? 1;

              return (
                <div className="producto-item" key={prod._id}>
                  <div className="producto-info">
                    <p className="producto-nombre">{name}</p>
                    <p className="producto-cantidad">
                      {qty} × ${price.toLocaleString("es-AR")}
                    </p>
                  </div>

                  <p className="producto-subtotal">
                    ${(qty * price).toLocaleString("es-AR")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MisPedidos;
