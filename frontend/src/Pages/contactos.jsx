import "../styles/contacto.css";

function Contacto() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="titulo-contacto">Contáctanos</h2>
          <p className="subtitulo-contacto">
            Estamos aquí para ayudarte a resolver tus dudas y recibir tus pedidos.
          </p>
        </div>
      </section>

      {/* Sección contacto */}
      <section className="contacto">
        <div className="contacto-grid">
          {/* FORMULARIO */}
          <form className="contacto-formulario" action="#" method="post">
            <div className="form-grid">
              <div className="field">
                <label htmlFor="nombre">Nombre *</label>
                <input type="text" id="nombre" name="nombre" required />
              </div>

              <div className="field">
                <label htmlFor="email">E-mail *</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="field">
                <label htmlFor="tel">Teléfono</label>
                <input type="tel" id="tel" name="tel" />
              </div>

              <div className="field">
                <label htmlFor="cel">Celular</label>
                <input type="tel" id="cel" name="cel" />
              </div>

              <div className="field">
                <label htmlFor="provincia">Provincia *</label>
                <input type="text" id="provincia" name="provincia" required />
              </div>

              <div className="field">
                <label htmlFor="ciudad">Ciudad *</label>
                <input type="text" id="ciudad" name="ciudad" required />
              </div>

              <div className="field field--full">
                <label htmlFor="motivo">Motivo *</label>
                <select id="motivo" name="motivo" required>
                  <option value="">Seleccionar</option>
                </select>
              </div>

              <div className="field field--full">
                <label htmlFor="mensaje">Mensaje *</label>
                <textarea id="mensaje" name="mensaje" rows="5" required />
              </div>

              <button type="submit" className="btn-enviar">Enviar Mensaje</button>
            </div>
          </form>

          {/* INFO CONTACTO */}
          <div className="contacto-info">
            <h3><strong>Hermanos Jota — Casa Taller</strong></h3>
            <p>
              Av. San Juan 2847<br />
              C1232AAB — Barrio de San Cristóbal<br />
              Ciudad Autónoma de Buenos Aires<br />
              Argentina
            </p>

            <h4><strong>Horarios:</strong></h4>
            <p>
              Lunes a Viernes: 10:00 - 19:00<br />
              Sábados: 10:00 - 14:00
            </p>

            <h4><strong>Teléfono:</strong></h4>
            <p>
              <a
                href="https://wa.me/5491112345678"
                rel="noopener noreferrer"
                target="_blank"
                style={{ fontSize: "medium" }}
              >
                +54 9 11 1234 5678
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contacto;
