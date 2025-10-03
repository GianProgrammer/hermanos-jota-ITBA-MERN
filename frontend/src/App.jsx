// src/App.js
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Footer from "./components/Footer";
import Home from "./Pages/home";
import Productos from "./Pages/productos";
import Contacto from "./Pages/contactos";
import DetalleProducto from "./Pages/Detalleproducto";

function App() {
  const [carrito, setCarrito] = useState([]); // 🛒 estado global del carrito

  // función para añadir un producto
  const addToCarrito = (producto) => {
    setCarrito([...carrito, producto]); // lo agrega al array
  };

  return (
    <>
      {/* Pasamos la cantidad de items a NavBar */}
      <NavBar carritoCount={carrito.length} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route 
          path="/producto/:id" 
          element={<DetalleProducto addToCarrito={addToCarrito} />} 
        />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;


