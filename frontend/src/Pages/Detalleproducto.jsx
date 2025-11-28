import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../auth/CartContext.js";
import "../styles/producto.css";

const API_BASE = "https://hermanos-jota-itba-mern-34lp.onrender.com/api/productos";

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 IMPORTANTE: usar el contexto DEL CARRITO
  const { addItemToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`${API_BASE}/${id}`)
      .then(res => res.json())
      .then(data => {
        setProducto(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleEliminar = async () => {
    const confirm = window.confirm("¿Estás seguro que quieres eliminar este producto?");
    if (!confirm) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Producto eliminado correctamente");
        navigate("/productos");
      } else {
        alert("Error al eliminar el producto");
      }
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el producto");
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando...</p>;
  if (!producto) return <p style={{ textAlign: "center", marginTop: "50px" }}>Producto no encontrado</p>;

  return (
    <main className="detalle-producto">
      <div className="detalle-imagen">
        <img src={producto.ruta} alt={producto.nombre} />
      </div>

      <div className="detalle-info">
        <h1>{producto.nombre}</h1>
        <p>{producto.descripcion}</p>
        <p><b>Medidas:</b> {producto.medidas}</p>

        <div className="botones">
          {/* 🔥 Usa el contexto para agregar */}
          <button className="btn" onClick={() => addItemToCart(producto)}>
            🛒 Añadir al Carrito
          </button>

          <button className="btn-eliminar" onClick={handleEliminar}>
            🗑 Eliminar
          </button>

          <Link to="/productos" className="btn-volver">
            ⬅ Volver a Productos
          </Link>
        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;
