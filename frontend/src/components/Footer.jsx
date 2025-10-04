import "../styles/footer.css"

function Footer() {
  return (
    <footer className="ln-footer-home lay-container flex flex-column">
      <div className="d-flex flex-row redes-container">
        <ul className="lista-footer">
          <li><p className="mail-footer"><b>Email general:</b> info@hermanosjota.com.ar</p></li>
          <li><p className="mail-footer"><b>Ventas:</b> ventas@hermanosjota.com.ar</p></li>
        </ul>
        <ul className="lista-footer">
          <li>
            <img className="fotoRed" src="img/instagram.png" alt="logo de instagram" />
            <a href="https://instagram.com" target="_blank" rel="noopener" className="redes"><b>Instagram</b></a>
          </li>
          <li>
            <img className="fotoRed" src="img/whatsapp.png" alt="logo de Whatsapp" />
            <a href="wa.link/tah7ex" target="_blank" rel="noopener" className="redes"><b>Whatsapp</b></a>
          </li>
        </ul>
      </div>
      <div className="d-flex flex-row copyright">
        <p><b>© 2025 Hermanos Jota.</b> Todoos los derechos reservados.</p>
      </div>
    </footer>
  );	
}
export default Footer;
