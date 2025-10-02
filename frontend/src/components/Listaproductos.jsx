import { useState } from "react";
import "../styles/home.css";

function ListaProductos({ productos, titulo, limite }) {
  const [busqueda, setBusqueda] = useState("");
  const [visible, setVisible] = useState(limite || 6); // si hay limite -> home, si no -> paginado de 6 en productos

  // filtro
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // lista a mostrar
  const productosAMostrar = productosFiltrados.slice(0, visible);

  return (
    <section className="prod-dest">
      {titulo && <h2>{titulo}</h2>}

      {/* Buscador: solo aparece si NO hay limite (en Productos) */}
      {!limite && (
        <div style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setVisible(6); // reset al buscar
            }}
            style={{
              border: "2px solid #A0522D",
              borderRadius: "25px",
              padding: "10px 15px",
              fontSize: "16px",
              maxWidth: "400px",
              width: "100%"
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
            <a href={`/producto/${prod.id}`} className="btn">Ver más</a>
          </div>
        </div>
      ))}

      {/* boton cargar mas */}
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
