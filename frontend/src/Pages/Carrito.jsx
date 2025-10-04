// src/Pages/Carrito.jsx
import "../styles/carrito.css";

function Carrito({ carrito }) {
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <div className="carrito-container">
      <h2>🛒 Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p className="carrito-empty">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="carrito-list">
            {carrito.map((prod, i) => (
              <li key={i} className="carrito-item">
                <img
                  src={prod.ruta}
                  alt={prod.nombre}
                  className="carrito-img"
                />
                <div className="carrito-info">
                  <h4>{prod.nombre}</h4>
                  <p className="carrito-descripcion">{prod.descripcion}</p>
                  <p>
                    <b>Precio:</b> ${prod.precio}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="carrito-total">
            <h3>Total: ${total}</h3>
            <button
              className="btn-confirm"
              onClick={() => alert("✅ Compra confirmada")}
            >
              Confirmar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;
