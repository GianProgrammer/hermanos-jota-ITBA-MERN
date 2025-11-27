import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/producto.css";

function ListaProductos({ titulo, limite }) {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [visible, setVisible] = useState(limite || 6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://hermanos-jota-itba-mern.onrender.com/api/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando...</p>;
  if (error) return <p style={{ textAlign: "center" }}>Error: {error}</p>;

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const productosAMostrar = productosFiltrados.slice(0, visible);

  return (
    <section className="lista-productos">
      {titulo && <h2 className="titulo-seccion">{titulo}</h2>}

      {!limite && (
        <div className="contenedor-busqueda">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setVisible(6);
            }}
            className="barra-busqueda"
          />
        </div>
      )}

      <div className="grid-productos">
        {productosAMostrar.map((producto) => (
        <div key={producto.id || producto.id} className="card">
          <img src={producto.ruta} alt={producto.nombre} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{producto.nombre}</h5>
            <p className="card-text">{producto.descripcion}</p>
            <p><b>Medidas:</b> {producto.medidas}</p>
            <Link to={`/producto/${producto.id || producto.id}`} className="btn">
              Ver más
            </Link>
          </div>
        </div>
        ))}
      </div>

      {!limite && visible < productosFiltrados.length && (
        <div className="contenedor-cargar-mas">
          <button className="btn" onClick={() => setVisible(visible + 6)}>
            Cargar más
          </button>
        </div>
      )}
    </section>
  );
}

export default ListaProductos;



