// src/Pages/Login.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Error en el login");

      console.log("Login exitoso, token:", data.token);

      // 1️⃣ Guardar token y user EN EL AUTHCONTEXT
      login(data.token, data.user);

      // 2️⃣ Guardar en localStorage para persistencia
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 3️⃣ Redirigir a Home
      navigate("/");

    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit} className="login-form">
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

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default Login;


