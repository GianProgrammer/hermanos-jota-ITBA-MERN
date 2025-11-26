// src/App.js
import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./Auth/AuthContext";

import NavBar from "./components/navbar";
import Footer from "./components/Footer";
import Home from "./Pages/home";
import Productos from "./Pages/productos";
import Contacto from "./Pages/contactos";
import DetalleProducto from "./Pages/Detalleproducto";
import Carrito from "./Pages/Carrito";
import CrearProducto from "./Pages/Admin";
import Login from "./Pages/Login";
import Register from "./Pages/Registrarse";

function App() {
  const [carrito, setCarrito] = useState([]);

  // 👇 Extraemos el usuario y el logout desde el AuthContext
  const { user, logout } = useContext(AuthContext);

  const addToCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <div className="App">

      {/* 👇 Ahora NAVBAR recibe user y logout */}
      <NavBar 
        carritoCount={carrito.length} 
        user={user} 
        onLogout={logout} 
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route 
          path="/producto/:id"
          element={<DetalleProducto addToCarrito={addToCarrito} />}
        />

        <Route 
          path="/contacto" 
          element={<Contacto />} 
        />

        <Route 
          path="/carrito" 
          element={<Carrito carrito={carrito} setCarrito={setCarrito} />}
        />

        {/* 👉 Solo ADMIN (más adelante lo protegemos) */}
        <Route path="/admin/crear-producto" element={<CrearProducto/>} />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;

