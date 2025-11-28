/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "../styles/AddProductForm.css";
import { useNavigate } from "react-router-dom";

// --- API base ---
const API_BASE = "https://hermanos-jota-itba-mern-34lp.onrender.com/api";

// --- Helper: verificación de nombre de producto ---
async function checkNombreExists(nombre) {
  const resp = await fetch(`${API_BASE}/productos/check-nombre`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre }),
  });

  if (!resp.ok) {
    let msg = "Error al verificar el nombre";
    try {
      const data = await resp.json();
      msg = data?.error || msg;
    } catch (error) {
      console.warn('Error parsing response:', error);
    }
    throw new Error(msg);
  }
  return resp.json();
}

// --- Estado inicial ---
const initialFormData = {
  ruta: "",
  nombre: "",
  descripcion: "",
  medidas: "",
  materiales: "",
  acabado: "",
  precio: "",
};

export default function CrearProducto() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [nombreError, setNombreError] = useState("");
  const [checkingNombre, setCheckingNombre] = useState(false);
  const [debounceId, setDebounceId] = useState(null);
  const [submitMsg, setSubmitMsg] = useState("");

  // --- Validación de nombre con debounce (400 ms) ---
  useEffect(() => {
    const nombre = formData.nombre.trim();

    if (!nombre) {
      setNombreError("");
      if (debounceId) clearTimeout(debounceId);
      return;
    }

    if (debounceId) clearTimeout(debounceId);
    const id = setTimeout(async () => {
      try {
        setCheckingNombre(true);
        const { exists } = await checkNombreExists(nombre);
        if (exists) {
          setNombreError("Ya existe un producto con ese nombre.");
        } else {
          setNombreError("");
        }
      } catch (err) {
        setNombreError(err.message || "Error al verificar el nombre");
      } finally {
        setCheckingNombre(false);
      }
    }, 400);

    setDebounceId(id);
    return () => clearTimeout(id);
  }, [formData.nombre]);

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMsg("");

    // Validaciones rápidas
    if (!formData.nombre.trim()) return setSubmitMsg("Ingresá un nombre de producto.");
    if (!formData.descripcion.trim()) return setSubmitMsg("Ingresá una descripción.");
    if (!formData.ruta.trim()) return setSubmitMsg("Ingresá la ruta/URL de imagen.");
    if (checkingNombre || nombreError) return setSubmitMsg("Revisá el nombre antes de guardar.");

    const precioNumber = Number(formData.precio);
    if (!precioNumber || precioNumber <= 0) return setSubmitMsg("Ingresá un precio válido (> 0).");

    try {
      // ✅ Generar ID único antes de enviar
      const id = crypto.randomUUID(); // o `Date.now().toString()`

      const payload = {
        id,
        ...formData,
        precio: precioNumber,
      };

      const resp = await fetch(`${API_BASE}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        let msg = "No se pudo crear el producto.";
        try {
          const data = await resp.json();
          msg = data?.error || msg;
        } catch (err) {
          console.warn("No se pudo parsear la respuesta:", err);
        }
        throw new Error(msg);
      }

      setFormData(initialFormData);
      setNombreError("");
      setSubmitMsg("✅ Producto creado con éxito");
      navigate("/productos");
    } catch (e) {
      setSubmitMsg(`❌ ${e.message}`);
    }
  };

  return (
    <div className="crear-producto-bg">
      <div className="form-wrap">
        <div className="card">
          <div className="form-header">
            <h1>Crear Producto</h1>
            <div className="subtitle">Completá los campos para añadir un nuevo producto</div>
          </div>

          <div className="hr" />

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre">Nombre *</label>
                <input
                  className="input"
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ej: Mesa de Centro Araucaria"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  aria-invalid={!!nombreError}
                  aria-describedby="nombreHelp nombreError"
                />
                {checkingNombre && !nombreError && (
                  <span id="nombreHelp" className="info" aria-live="polite">
                    Verificando nombre…
                  </span>
                )}
                {nombreError && (
                  <span id="nombreError" className="error" aria-live="polite">
                    {nombreError}
                  </span>
                )}
              </div>

              {/* Precio */}
              <div>
                <label htmlFor="precio">Precio (AR$) *</label>
                <input
                  className="input"
                  type="number"
                  id="precio"
                  name="precio"
                  min="0"
                  step="1"
                  placeholder="250000"
                  required
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                  onWheel={(e) => e.currentTarget.blur()}
                />
              </div>

              {/* Ruta */}
              <div className="form-row-full">
                <label htmlFor="ruta">Ruta / URL de imagen *</label>
                <input
                  className="input"
                  type="text"
                  id="ruta"
                  name="ruta"
                  placeholder="/img/MiProducto.png o https://..."
                  required
                  value={formData.ruta}
                  onChange={(e) => setFormData({ ...formData, ruta: e.target.value })}
                />
              </div>

              {/* Descripción */}
              <div className="form-row-full">
                <label htmlFor="descripcion">Descripción *</label>
                <textarea
                  className="textarea"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Detalles del producto, materiales, uso, etc."
                  required
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                />
              </div>

              {/* Medidas */}
              <div>
                <label htmlFor="medidas">Medidas</label>
                <input
                  className="input"
                  type="text"
                  id="medidas"
                  name="medidas"
                  placeholder="Ej: 180 x 45 x 75 cm"
                  value={formData.medidas}
                  onChange={(e) => setFormData({ ...formData, medidas: e.target.value })}
                />
              </div>

              {/* Materiales */}
              <div>
                <label htmlFor="materiales">Materiales</label>
                <input
                  className="input"
                  type="text"
                  id="materiales"
                  name="materiales"
                  placeholder="Nogal macizo, acero, etc."
                  value={formData.materiales}
                  onChange={(e) => setFormData({ ...formData, materiales: e.target.value })}
                />
              </div>

              {/* Acabado */}
              <div>
                <label htmlFor="acabado">Acabado</label>
                <input
                  className="input"
                  type="text"
                  id="acabado"
                  name="acabado"
                  placeholder="Aceite natural, laca mate…"
                  value={formData.acabado}
                  onChange={(e) => setFormData({ ...formData, acabado: e.target.value })}
                />
              </div>
            </div>

            <div className="actions">
              <button className="btn" type="submit" disabled={!!nombreError || checkingNombre}>
                Crear Producto
              </button>
            </div>

            {submitMsg && (
              <div className="submit-msg" aria-live="polite">
                {submitMsg}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
