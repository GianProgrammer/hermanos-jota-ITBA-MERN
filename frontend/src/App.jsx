// src/App.js
import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";

import NavBar from "./components/navbar";
import Footer from "./components/Footer";

import Home from "./Pages/home";
import Productos from "./Pages/productos";
import Contacto from "./Pages/contactos";
import DetalleProducto from "./Pages/Detalleproducto";

import Carrito from "./Pages/Carrito";
import MisPedidos from "./Pages/Mispedidos";

import Login from "./Pages/Login";
import Register from "./Pages/Registrarse";

// 👉 ESTAS son las TRES páginas admin
import CrearProducto from "./Pages/Admin";
import AdminProductos from "./Pages/Adminproductos";
import AdminPedidos from "./Pages/Adminpedidos";

// 👇 Protección
import { ProtectedRoute, AdminRoute } from "./auth/ProtectedRoute";


function App() {
  const [carrito, setCarrito] = useState([]);

  const { user, logout } = useContext(AuthContext);

  return (
    <div className="App">

      <NavBar 
        carritoCount={carrito.length}
        user={user}
        onLogout={logout}
      />

      <Routes>

        {/* ------------------------ */}
        {/*        PÚBLICAS          */}
        {/* ------------------------ */}
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/contacto" element={<Contacto />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ------------------------ */}
        {/*   SOLO USUARIO LOGUEADO  */}
        {/* ------------------------ */}
        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <Carrito carrito={carrito} setCarrito={setCarrito} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mis-pedidos"
          element={
            <ProtectedRoute>
              <MisPedidos />
            </ProtectedRoute>
          }
        />

        {/* ------------------------ */}
        {/*        SOLO ADMIN         */}
        {/* ------------------------ */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <CrearProducto />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/productos"
          element={
            <AdminRoute>
              <AdminProductos />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/pedidos"
          element={
            <AdminRoute>
              <AdminPedidos />
            </AdminRoute>
          }
        />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
