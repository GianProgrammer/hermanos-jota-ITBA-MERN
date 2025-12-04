/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import "../styles/adminproductos.css";
import { AuthContext } from "../auth/AuthContext.js";


const API = "https://hermanos-jota-itba-mern-34lp.onrender.com/api/productos";

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(null);
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    ruta: "",
    nombre: "",
    descripcion: "",
    medidas: "",
    materiales: "",
    acabado: "",
    precio: "",
  });

  const cargarProductos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form, precio: Number(form.precio) };

    const url = editando ? `${API}/${editando}` : API;
    const method = editando ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Error guardando producto");
      return;
    }

    setForm({
      ruta: "",
      nombre: "",
      descripcion: "",
      medidas: "",
      materiales: "",
      acabado: "",
      precio: "",
    });

    setEditando(null);
    cargarProductos();
  };

  const cargarParaEditar = (p) => {
    setEditando(p._id);
    setForm({
      ruta: p.ruta,
      nombre: p.nombre,
      descripcion: p.descripcion,
      medidas: p.medidas,
      materiales: p.materiales,
      acabado: p.acabado,
      precio: p.precio,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const borrarProducto = async (id) => {
    if (!confirm("¿Seguro que querés eliminar este producto?")) return;

    const res = await fetch(`${API}/${id}`, { 
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });


    if (res.ok) cargarProductos();
    else alert("Error al eliminar");
  };

  return (
    <div className="admin-productos-container">
      <h1>Administrar Productos</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>{editando ? "Editar Producto" : "Crear Producto"}</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Ruta / Imagen"
          value={form.ruta}
          onChange={(e) => setForm({ ...form, ruta: e.target.value })}
          required
        />

        <textarea
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Medidas"
          value={form.medidas}
          onChange={(e) => setForm({ ...form, medidas: e.target.value })}
        />

        <input
          type="text"
          placeholder="Materiales"
          value={form.materiales}
          onChange={(e) => setForm({ ...form, materiales: e.target.value })}
        />

        <input
          type="text"
          placeholder="Acabado"
          value={form.acabado}
          onChange={(e) => setForm({ ...form, acabado: e.target.value })}
        />

        <button type="submit">
          {editando ? "Guardar Cambios" : "Crear Producto"}
        </button>

        {editando && (
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => {
              setEditando(null);
              setForm({
                ruta: "",
                nombre: "",
                descripcion: "",
                medidas: "",
                materiales: "",
                acabado: "",
                precio: "",
              });
            }}
          >
            Cancelar edición
          </button>
        )}
      </form>

      <div className="admin-products-grid">
        {productos.map((p) => (
          <div key={p._id} className="admin-product-card">
            <img src={p.ruta} alt={p.nombre} />
            <h3>{p.nombre}</h3>
            <p>${p.precio}</p>

            <div className="admin-actions">
              <button className="btn-edit" onClick={() => cargarParaEditar(p)}>
                ✏️ Editar
              </button>

              <button
                className="btn-delete"
                onClick={() => borrarProducto(p._id)}
              >
                🗑️ Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
