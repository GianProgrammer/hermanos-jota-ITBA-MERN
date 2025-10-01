import "../styles/productos.css";

function Productos() {
  return (
    <main id="productos-page">
      <h1 className="text-center mb-4">Nuestros Productos</h1>

      <div className="mb-4 text-center">
        <input
          type="text"
          id="buscador"
          className="form-control mx-auto"
          placeholder="Buscar producto..."
        />
      </div>

      <div id="lista-productos"></div>

      <div className="text-center">
        <button id="btn-cargar">Cargar más</button>
      </div>
    </main>
  );
}

export default Productos;
