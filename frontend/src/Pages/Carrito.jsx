import "../styles/carrito.css";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../auth/CartContext.js";
import { AuthContext } from "../auth/AuthContext.js";

function Carrito() {
  const { cartItems, addItemToCart, updateQuantity, removeItem, clearCart } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [mensajeCompra, setMensajeCompra] = useState("");
  const [detallePedido, setDetallePedido] = useState(null);
  const [estadoPedido, setEstadoPedido] = useState("");

  const [productos, setProductos] = useState([]);
  const [indice, setIndice] = useState(0);

  // TOTAL corregido
  const total = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  // ---------------------------
  // 🔥 CONFIRMAR COMPRA
  // ---------------------------
  const confirmarCompra = async () => {
    if (!user) {
      return alert("Debes iniciar sesión para confirmar tu compra");
    }

    try {
      const res = await fetch(
        "https://hermanos-jota-itba-mern-34lp.onrender.com/api/mis-pedidos/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            productos: cartItems,
            total,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMensajeCompra("¡Compra realizada con éxito! 🎉");
        setDetallePedido(cartItems);
        setEstadoPedido("Pedido confirmado y registrado ✔️");

        clearCart();

        setTimeout(() => {
          setMensajeCompra("");
          setDetallePedido(null);
          setEstadoPedido("");
        }, 4000);
      } else {
        alert(data.message || "Error al confirmar compra");
      }
    } catch (err) {
      console.error(err);
      alert("Error de servidor");
    }
  };

  // ---------------------------
  // Recomendados
  // ---------------------------
  useEffect(() => {
    fetch("https://hermanos-jota-itba-mern.onrender.com/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  useEffect(() => {
    if (productos.length === 0) return;
    const intervalo = setInterval(
      () => setIndice((prev) => (prev + 3) % productos.length),
      5000
    );
    return () => clearInterval(intervalo);
  }, [productos]);

  const siguiente = () => setIndice((prev) => (prev + 3) % productos.length);
  const anterior = () =>
    setIndice((prev) => (prev - 3 + productos.length) % productos.length);

  const recomendados = productos.slice(indice, indice + 3);

  return (
    <div className="carrito-wrapper">
      <h2 className="carrito-titulo">🛍️ Carrito de Compras</h2>

      {/* 🔥 Cartel de compra */}
      {mensajeCompra && (
        <div className="carrito-mensaje">
          <h3>{mensajeCompra}</h3>

          {detallePedido && (
            <div className="pedido-detalle">
              {detallePedido.map((item) => (
                <div key={item._id} className="pedido-item">
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <span>
                    ${((item.price || 0) * item.quantity).toLocaleString("es-AR")}
                  </span>
                </div>
              ))}

              <div className="pedido-total">
                <b>Total:</b> <b>${total.toLocaleString("es-AR")}</b>
              </div>
            </div>
          )}

          {estadoPedido && <p className="pedido-estado">{estadoPedido}</p>}
        </div>
      )}

      {/* Si el carrito está vacío */}
      {cartItems.length === 0 ? (
        <div className="carrito-vacio">
          <p className="carrito-empty">Tu carrito está vacío.</p>

          <div className="recomendados">
            <h3>Productos que podrían interesarte</h3>

            <div className="recomendados-carousel">
              {recomendados.map((producto) => (
                <div key={producto._id} className="recomendado-card">
                  <img src={producto.ruta} />
                  <h4>{producto.nombre}</h4>
                  <p>${producto.precio}</p>
                  <button onClick={() => addItemToCart(producto)}>
                    Añadir al carrito
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
        // Si hay productos
        <div className="carrito-layout">
          <ul className="carrito-list">
            {cartItems.map((item) => (
              <li key={item._id} className="carrito-item">
                <img src={item.imageUrl} className="carrito-img" />

                <div className="carrito-info">
                  <h4>{item.name}</h4>

                  <p className="precio">
                    ${(item.price || 0).toLocaleString("es-AR")}
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


