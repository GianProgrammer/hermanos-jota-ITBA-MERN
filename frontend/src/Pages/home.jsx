import "../styles/home.css";
import productos from "../components/productos";
import ListaProductos from "../components/Listaproductos";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>Diseño Artesanal,<br />Calidad Garantizada</h2>
          <a href="/productos" className="btn">Ver Catálogo</a>
        </div>
      </section>

      {/* Solo primeros 3 productos */}
      <ListaProductos productos={productos} titulo="Productos Destacados" limite={3} />
    </>
  );
}

export default Home;




