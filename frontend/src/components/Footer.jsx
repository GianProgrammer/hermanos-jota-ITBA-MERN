import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="redes-container">
        <ul className="lista-footer">
          <li>
            <p className="mail-footer">
              <b>Email general:</b> info@hermanosjota.com.ar
            </p>
          </li>
          <li>
            <p className="mail-footer">
              <b>Ventas:</b> ventas@hermanosjota.com.ar
            </p>
          </li>
        </ul>

        <ul className="lista-footer">
          <li>
            <img
              className="fotoRed"
              src="/img/instagram.png"
              alt="Logo de Instagram"
            />
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="redes"
            >
              <b>Instagram</b>
            </a>
          </li>
          <li>
            <img
              className="fotoRed"
              src="/img/whatsapp.png"
              alt="Logo de Whatsapp"
            />
            <a
              href="https://wa.link/tah7ex"
              target="_blank"
              rel="noopener noreferrer"
              className="redes"
            >
              <b>Whatsapp</b>
            </a>
          </li>
        </ul>
      </div>

      <div className="copyright">
        <p>
          <b>© 2025 Hermanos Jota.</b> Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

