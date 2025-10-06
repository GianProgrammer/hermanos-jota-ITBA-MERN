import { useParams, Link } from "react-router-dom";
import productos from "../../../backend/productos";
import "../styles/producto.css";

function DetalleProducto({ addToCarrito }) {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Producto no encontrado</p>;
  }

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
          <button className="btn" onClick={() => addToCarrito(producto)}>
            🛒 Añadir al Carrito
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



