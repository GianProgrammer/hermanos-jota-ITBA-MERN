// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al registrarse.");

      // Registro exitoso ✨
      setSuccessMsg("Registro exitoso. Redirigiendo al inicio de sesión...");

      // Redireccionar al login después de 1.5 segundos
      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Crear cuenta</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Tu nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="tuemail@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Repetir contraseña:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="********"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creando cuenta..." : "Registrarme"}
        </button>
      </form>
    </div>
  );
}

export default Register;

