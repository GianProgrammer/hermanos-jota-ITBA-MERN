import { useParams, Link } from "react-router-dom";
import productos from "../components/productos";
import "../styles/home.css";

function DetalleProducto() {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <main id="detalle-producto">
      <div className="imagen">
        <img src={producto.ruta} alt={producto.nombre} />
      </div>
      <div className="info">
        <h1>{producto.nombre}</h1>
        <p>{producto.descripcion}</p>
        <div className="precio">Medidas: {producto.medidas}</div>
        <Link to="/productos" className="btn-volver">⬅ Volver a Productos</Link>
      </div>
    </main>
  );
}

export default DetalleProducto;
