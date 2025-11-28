import "../styles/carrito.css";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../auth/CartContext.js";

function Carrito() {
  const {
    cartItems,
    addItemToCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useContext(CartContext);

  const [mensajeCompra, setMensajeCompra] = useState("");
  const [detallePedido, setDetallePedido] = useState(null); // 🔥 nuevo
  const [estadoPedido, setEstadoPedido] = useState(""); // 🔥 nuevo

  const [productos, setProductos] = useState([]);
  const [indice, setIndice] = useState(0);

  const total = cartItems.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  // 🔥 FUNCIÓN DE COMPRA MEJORADA
  const confirmarCompra = () => {
    setDetallePedido(cartItems); // guardamos lo que el usuario compró
    setEstadoPedido("Procesando pedido…");
    setMensajeCompra("¡Esta es su compra! 🧾");

    // 1 segundo: mostrar mensaje + detalle
    // 2 segundos: vaciar carrito + mostrar estado
    setTimeout(() => {
      setEstadoPedido("Pedido confirmado ✔️");
      clearCart();
    }, 2000);

    // 4 segundos: ocultar cartel y estado
    setTimeout(() => {
      setMensajeCompra("");
      setEstadoPedido("");
      setDetallePedido(null);
    }, 4000);
  };

  useEffect(() => {
    fetch("https://hermanos-jota-itba-mern.onrender.com/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  useEffect(() => {
    if (productos.length === 0) return;
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 3) % productos.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [productos]);

  const siguiente = () =>
    setIndice((prev) => (prev + 3) % productos.length);

  const anterior = () =>
    setIndice((prev) => (prev - 3 + productos.length) % productos.length);

  const recomendados = productos.slice(indice, indice + 3);

  return (
    <div className="carrito-wrapper">
      <h2 className="carrito-titulo">🛍️ Carrito de Compras</h2>

      {/* 🔥 MENSAJE DE COMPRA */}
      {mensajeCompra && (
        <div className="carrito-mensaje">
          <h3>{mensajeCompra}</h3>

          {/* 🔥 DETALLE DEL PEDIDO */}
          {detallePedido && (
            <div className="pedido-detalle">
              {detallePedido.map((item) => (
                <div key={item._id} className="pedido-item">
                  <span>{item.quantity} × {item.nombre}</span>
                  <span>${(item.precio * item.quantity).toLocaleString("es-AR")}</span>
                </div>
              ))}
              <div className="pedido-total">
                <b>Total:</b>
                <b>${total.toLocaleString("es-AR")}</b>
              </div>
            </div>
          )}

          {/* 🔥 ESTADO DEL PEDIDO */}
          {estadoPedido && (
            <p className="pedido-estado">{estadoPedido}</p>
          )}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="carrito-vacio">
          <p className="carrito-empty">Tu carrito está vacío.</p>

          <div className="recomendados">
            <h3>Productos que podrían interesarte</h3>

            <div className="recomendados-carousel">
              {recomendados.map((producto) => (
                <div key={producto._id} className="recomendado-card">
                  <img src={producto.ruta} alt={producto.nombre} />
                  <h4>{producto.nombre}</h4>
                  <p>${producto.precio.toLocaleString("es-AR")}</p>

                  <button onClick={() => addItemToCart(producto)}>
                    🛒 Añadir al carrito
                  </button>
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
        <div className="carrito-layout">
          <ul className="carrito-list">
            {cartItems.map((item) => (
              <li key={item._id} className="carrito-item">
                <img src={item.ruta} alt={item.nombre} className="carrito-img" />

                <div className="carrito-info">
                  <h4>{item.nombre}</h4>
                  <p className="carrito-descripcion">{item.descripcion}</p>

                  <p className="precio">
                    <b>${item.precio.toLocaleString("es-AR")}</b>
                  </p>

                  <div className="cantidad-row">
                    <button
                      className="cantidad-btn"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>

                    <span className="cantidad-num">{item.quantity}</span>

                    <button
                      className="cantidad-btn"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn-borrar"
                    onClick={() => removeItem(item._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

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

            <button className="btn-confirm" onClick={confirmarCompra}>
              Confirmar compra
            </button>

            <button className="btn-vaciar" onClick={clearCart}>
              Vaciar carrito
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Carrito;



