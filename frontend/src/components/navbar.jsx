// src/components/navbar.jsx
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function NavBar({ carritoCount }) {
  return (
    <header>
      <a href="/">
        <img src="/img/logo.svg" alt="Hermanos Jota" className="logo" />
      </a>
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
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;



