// src/components/NavBar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import "../styles/navbar.css";

function NavBar({ carritoCount }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <Link to="/">
        <img src="/img/logo.svg" alt="Hermanos Jota" className="logo" />
      </Link>

      <nav>
        <ul>
          <li>
            <Link to="/" className="botonesHeader">Inicio</Link>
          </li>

          <li>
            <Link to="/productos" className="botonesHeader">Productos</Link>
          </li>

          <li>
            <Link to="/contacto" className="botonesHeader">Contacto</Link>
          </li>

          <li>
            <Link to="/carrito" className="botonesHeader">
              🛒 Carrito ({carritoCount})
            </Link>
          </li>

          {/* 🔐 Mostrar botón ADMIN solo si user.isAdmin = true */}
          {user?.isAdmin && (
            <li>
              <Link to="/admin/crear-producto" className="botonesHeader">
                Crear producto
              </Link>
            </li>
          )}

          {/* 🔐 Si NO hay usuario → Login / Registrarse */}
          {!user ? (
            <>
              <li>
                <Link to="/login" className="botonesHeader">Login</Link>
              </li>
              <li>
                <Link to="/register" className="botonesHeader">Registrarse</Link>
              </li>
            </>
          ) : (
            /* 🔐 Si hay usuario logueado → username + Logout */
            <>
              <li>
                <Link to="/profile" className="botonesHeader">
                  {user.username}
                </Link>
              </li>

              <li>
                <button 
                  className="botonesHeader logoutBtn" 
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;





