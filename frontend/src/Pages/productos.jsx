import productos from "../components/productos";
import ListaProductos from "../components/Listaproductos";

function Productos() {
  return (
    <main id="productos-page">
      <ListaProductos productos={productos} titulo="Nuestros Productos" />
    </main>
  );
}

export default Productos;

