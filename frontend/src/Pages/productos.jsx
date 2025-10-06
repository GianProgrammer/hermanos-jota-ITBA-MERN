// src/Pages/Productos.jsx
import ListaProductos from "../components/Listaproductos";
import "../styles/producto.css";

function Productos() {
  return (
    <main className="productos-container">
      <ListaProductos titulo="Nuestros Productos" />
    </main>
  );
}

export default Productos;

