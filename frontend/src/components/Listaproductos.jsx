import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

function ListaProductos({ titulo, limite }) {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [visible, setVisible] = useState(limite || 6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/productos") // puerto del backend
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
    <section className="prod-dest">
      {titulo && <h2>{titulo}</h2>}

      {/* Buscador: solo en página Productos */}
      {!limite && (
        <div style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setVisible(6);
            }}
            style={{
              border: "2px solid #A0522D",
              borderRadius: "25px",
              padding: "10px 15px",
              fontSize: "16px",
              maxWidth: "400px",
              width: "100%",
            }}
          />
        </div>
      )}

      {/* grid de productos */}
      {productosAMostrar.map((prod) => (
        <div key={prod.id} className="card">
          <img src={prod.ruta} alt={prod.nombre} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{prod.nombre}</h5>
            <p className="card-text">{prod.descripcion}</p>
            <p><b>Medidas:</b> {prod.medidas}</p>
            <Link to={`/producto/${prod.id}`} className="btn">
              Ver más
            </Link>
          </div>
        </div>
      ))}

      {/* botón cargar más */}
      {!limite && visible < productosFiltrados.length && (
        <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          <button className="btn" onClick={() => setVisible(visible + 6)}>
            Cargar más
          </button>
        </div>
      )}
    </section>
  );
}

export default ListaProductos;

