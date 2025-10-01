import { Link } from "react-router-dom";
import "../styles/navbar.css";

function NavBar() {
  return (
    <header>
      <a href="/">
        <img src="/img/logo.svg" alt="Hermanos Jota" className="logo" />
      </a>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/productos">Productos</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;

