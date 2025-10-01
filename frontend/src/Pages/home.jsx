import "../styles/home.css";
import ProductosDestacados from "../components/ProductosDestacados";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>
            Diseño Artesanal,<br />Calidad Garantizada
          </h2>
          <a href="/productos" className="btn">Ver Catálogo</a>
        </div>
      </section>

      <ProductosDestacados />
    </>
  );
}

export default Home;


