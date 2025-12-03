// src/components/NavBar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext.js";
import { CartContext } from "../auth/CartContext.js";

import "../styles/navbar.css";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  let closeTimeout;

  // ---------------------------
  // 🔍 BUSCAR
  // ---------------------------
  const handleSearch = async () => {
    const query = search.trim().toLowerCase();
    if (!query) return;

    try {
      const res = await fetch(
        "https://hermanos-jota-itba-mern-34lp.onrender.com/api/productos"
      );
      const productos = await res.json();

      const encontrado = productos.find((p) =>
        p.nombre?.toLowerCase().includes(query)
      );

      if (encontrado) navigate(`/productos/${encontrado._id}`);
      else alert("Producto no encontrado");

      setSearch("");
      setShowSuggestions(false);
    } catch (err) {
      console.error("Error buscando producto:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // ---------------------------
  // 🔤 SUGERENCIAS
  // ---------------------------
  const handleChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const res = await fetch(
        "https://hermanos-jota-itba-mern-34lp.onrender.com/api/productos"
      );
      const productos = await res.json();

      const matches = productos.filter((p) =>
        p.nombre?.toLowerCase().includes(value.toLowerCase())
      );

      setSuggestions(matches.slice(0, 5));
      setShowSuggestions(true);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------------------
  // Cerrar sugerencias
  // ---------------------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".navbar-search")) setShowSuggestions(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ---------------------------
  // 🛒 CARRITO COUNT
  // ---------------------------
  const carritoCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // ---------------------------
  // MENU USUARIO
  // ---------------------------
  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => setMenuOpen(false), 250);
  };

  return (
    <header className="navbar">

      {/* IZQUIERDA */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src="/img/logo.svg" alt="logo" />
          <span>Hermanos Jota</span>
        </Link>
      </div>

      {/* CENTRO */}
      <nav className="navbar-center">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>

      {/* DERECHA */}
      <div className="navbar-right">

        {/* 🔍 BUSCADOR */}
        <div className="navbar-search">
          <input
            placeholder="Buscar..."
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <span className="icon" onClick={handleSearch}>🔍</span>

          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((p) => (
                <div
                  key={p._id}
                  className="suggestion-item"
                  onClick={() => {
                    navigate(`/productos/${p._id}`);
                    setShowSuggestions(false);
                    setSearch("");
                  }}
                >
                  {p.nombre}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🔐 LOGIN / USER */}
        {!user ? (
          <>
            <Link to="/login" className="navbar-btn">Ingresar</Link>
            <Link to="/register" className="navbar-btn">Registrarse</Link>
          </>
        ) : (
          <div
            className="user-menu"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="user-trigger">
              <span className="navbar-username">{user.username}</span>
              <span className="user-icon">▾</span>
            </div>

            {menuOpen && (
              <div className="user-dropdown">

                {/* 🟢 MI PERFIL (para todos los usuarios logueados) */}
                <Link to="/profile">Mi perfil</Link>

                {/* 🟢 MIS PEDIDOS */}
                {user.role === "usuario" && (
                  <Link to="/mis-pedidos">Mis pedidos</Link>)
                }
                
                {/* 🔴 SOLO ADMIN */}
                {user.role === "admin" && (
                  <Link to="/admin">Panel Admin</Link>
                )}

                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}

        {/* 🛒 SOLO USUARIOS LOGUEADOS */}
        {user && user.role === "usuario" && (
          <Link to="/carrito" className="navbar-cart">
            🛒<span className="cart-count">{carritoCount}</span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default NavBar;










