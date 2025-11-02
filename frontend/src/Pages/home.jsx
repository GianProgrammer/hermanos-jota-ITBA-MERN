import "../styles/home.css";
import productos from "../../../backend/productos";
import ListaProductos from "../components/Listaproductos";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>Diseño Artesanal,<br />Calidad Garantizada</h2>
          <Link to="/productos" className="btn">
            Ver Catálogo
          </Link>
        </div>
      </section>

      <section className="prod-dest">
        <ListaProductos
          productos={productos}
          titulo="Productos Destacados"
          limite={3}
        />
      </section>

    </>
  );
}

export default Home;




