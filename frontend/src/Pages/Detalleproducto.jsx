// src/Pages/Detalleproducto.jsx
import { useParams, Link } from "react-router-dom";
import productos from "../components/productos";
import "../styles/producto.css";

function DetalleProducto({ addToCarrito }) {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <main id="detalle-producto">
      <div className="imagen">
        <img src={producto.ruta} alt={producto.nombre} />
      </div>

      <div className="info">
        <h1>{producto.nombre}</h1>
        <p>{producto.descripcion}</p>
        <p><b>Medidas:</b> {producto.medidas}</p>

        {/* ✅ Botón que añade al carrito */}
        <button className="btn" onClick={() => addToCarrito(producto)}>
          🛒 Añadir al Carrito
        </button>

        <Link to="/productos" className="btn-volver">
          ⬅ Volver a Productos
        </Link>
      </div>
    </main>
  );
}

export default DetalleProducto;


