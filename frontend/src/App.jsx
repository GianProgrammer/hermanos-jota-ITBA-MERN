// import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/navbar'
import './styles/app.css'
import Footer from './components/Footer';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/productos" element={<h1>Productos</h1>} />
        <Route path="/contacto" element={<h1>About</h1>} />
      </Routes>
      <Footer/>
    </>    
  )
}

export default App;
