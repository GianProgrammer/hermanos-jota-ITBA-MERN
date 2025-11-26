// src/components/NavBar.jsx
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import "../styles/navbar.css";

function NavBar({ carritoCount }) {
  const { user, logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  let closeTimeout;

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setMenuOpen(false);
    }, 250); // ⏳ retardo de cierre
  };

  return (
    <header className="navbar">

      {/* IZQUIERDA — LOGO */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src="/img/logo.svg" alt="logo" />
          <span>Hermanos Jota</span>
        </Link>
      </div>

      {/* CENTRO — MENÚ */}
      <nav className="navbar-center">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>

      {/* DERECHA — BUSCADOR + USER + CARRITO */}
      <div className="navbar-right">

        {/* Buscador */}
        <div className="navbar-search">
          <input 
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="icon">🔍</span>
        </div>
        {/* Login / Logout */}
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
                <Link to="/profile">Mi perfil</Link>

                <button
                  onClick={() => {
                    logout();        // vacía el contexto correctamente
                    setMenuOpen(false); // cierra el dropdown
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
        {/* Carrito */}
        <Link to="/carrito" className="navbar-cart">
          🛒<span className="cart-count">{carritoCount}</span>
        </Link>
      </div>

    </header>
  );
}

export default NavBar;








