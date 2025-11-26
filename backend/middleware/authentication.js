import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  // 1️⃣ El token se envía por header, no por cookies
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No autenticado: falta header Authorization" });
  }

  // 2️⃣ Esperamos formato: "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No autenticado: formato incorrecto" });
  }

  try {
    // 3️⃣ Verificar JWT con tu clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Guardar datos del usuario en req.user
    req.user = decoded;

    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido" });
    }

    return res.status(500).json({ message: "Error al verificar token" });
  }
};


