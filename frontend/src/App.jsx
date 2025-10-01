import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Footer from "./components/Footer";
import Home from "./Pages/home";
import Productos from "./Pages/productos";
import Contacto from "./Pages/contactos";


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;


