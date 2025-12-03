// src/Pages/admin.jsx
import { Link } from "react-router-dom";
import "../styles/Admin.css";

export default function Admin() {
  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administración</h1>
      <p className="admin-subtitle">Seleccioná una acción</p>

      <div className="admin-buttons">
        <Link to="/admin/productos" className="admin-btn">
          🛠️ Administrar Productos
        </Link>

        <Link to="/admin/pedidos" className="admin-btn">
          📦 Ver Pedidos
        </Link>
      </div>
    </div>
  );
}

