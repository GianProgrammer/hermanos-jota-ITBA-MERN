import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Footer from "./components/Footer";
import Home from "./Pages/home";
import Productos from "./Pages/productos";
import Contacto from "./Pages/contactos";
import DetalleProducto from "./Pages/producto";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

