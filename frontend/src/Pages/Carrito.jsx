import "../styles/carrito.css";
import { useState, useEffect } from "react";

function Carrito({ carrito, setCarrito, addToCarrito }) {
  // --- Estados ---
  const [productos, setProductos] = useState([]);
  const [indice, setIndice] = useState(0);

  // --- Calcular total ---
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  // --- Borrar producto del carrito ---
  const borrarItem = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  // --- Cargar productos del backend ---
  useEffect(() => {
    fetch("https://hermanos-jota-itba-mern.onrender.com/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  // --- Rotación automática cada 5 segundos ---
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 3) % productos.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [productos]);

  // --- Controles manuales del carrusel ---
  const siguiente = () =>
    setIndice((prev) => (prev + 3) % productos.length);

  const anterior = () =>
    setIndice((prev) => (prev - 3 + productos.length) % productos.length);

  // --- Productos visibles en el carrusel ---
  const recomendados = productos.slice(indice, indice + 3);

  // --- Render ---
  return (
    <div className="carrito-wrapper">
      <h2 className="carrito-titulo">🛍️ Carrito de Compras</h2>

      {carrito.length === 0 ? (
        // 🛒 Si el carrito está vacío
        <div className="carrito-vacio">
          <p className="carrito-empty">Tu carrito está vacío.</p>
        <div className="recomendados">
          <h3>Productos que podrían interesarte</h3>

          <div className="recomendados-carousel">
            {recomendados.map((p) => (
              <div key={p.id} className="recomendado-card">
                <img src={p.ruta} alt={p.nombre} />
                <h4>{p.nombre}</h4>
                <p>${p.precio.toLocaleString("es-AR")}</p>
                <button onClick={() => addToCarrito(p)}>Añadir al carrito</button>
              </div>
            ))}
          </div>

          <div className="carousel-controles">
            <button onClick={anterior}>←</button>
            <button onClick={siguiente}>→</button>
          </div>
        </div>
        </div>
      ) : (
        // 🧾 Si hay productos en el carrito
        <div className="carrito-layout">
          {/* Lista de productos */}
          <ul className="carrito-list">
            {carrito.map((prod, i) => (
              <li key={i} className="carrito-item">
                <img src={prod.ruta} alt={prod.nombre} className="carrito-img" />

                <div className="carrito-info">
                  <h4>{prod.nombre}</h4>
                  <p className="carrito-descripcion">{prod.descripcion}</p>
                  <p className="precio">
                    <b>${prod.precio.toLocaleString("es-AR")}</b>
                  </p>
                  <button
                    className="btn-borrar"
                    onClick={() => borrarItem(i)}
                    title="Eliminar producto"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Resumen de compra */}
          <aside className="carrito-resumen">
            <h3>Resumen de compra</h3>
            <div className="carrito-linea">
              <span>Subtotal</span>
              <span>${total.toLocaleString("es-AR")}</span>
            </div>
            <div className="carrito-linea">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <hr />
            <div className="carrito-linea total">
              <b>Total</b>
              <b>${total.toLocaleString("es-AR")}</b>
            </div>

            <button
              className="btn-confirm"
              onClick={() => alert("Compra confirmada")}
            >
              Confirmar compra
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Carrito;


