// backend/routes/contacto.routes.js
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// POST /api/contacto
router.post("/", async (req, res) => {
  const datos = req.body;
  console.log("📩 Mensaje recibido del formulario:", datos);

  try {
    // Crear el transporte con tu cuenta Gmail y clave de aplicación
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📨 1. Email para vos (administrador)
    const mailAdmin = {
      from: `"Formulario Hermanos Jota" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de ${datos.nombre}`,
      text: `
Nuevo mensaje desde el formulario de contacto:

Nombre: ${datos.nombre}
Email: ${datos.email}
Teléfono: ${datos.tel}
Celular: ${datos.cel}
Provincia: ${datos.provincia}
Ciudad: ${datos.ciudad}
Motivo: ${datos.motivo}
Mensaje: ${datos.mensaje}
      `,
    };

    // 💌 2. Email de confirmación al usuario
    const mailUsuario = {
      from: `"Hermanos Jota" <${process.env.EMAIL_USER}>`,
      to: datos.email,
      subject: "¡Gracias por contactarte con Hermanos Jota!",
      text: `
Hola ${datos.nombre},

Recibimos tu mensaje correctamente y nos pondremos en contacto con vos a la brevedad.

🪵 Motivo: ${datos.motivo}
📍 Ciudad: ${datos.ciudad}
📞 Teléfono: ${datos.tel || "No especificado"}

Gracias por escribirnos.
El equipo de Hermanos Jota
      `,
    };

    // Enviar ambos correos
    await transporter.sendMail(mailAdmin);
    await transporter.sendMail(mailUsuario);

    console.log("✅ Correos enviados con éxito");
    res.json({ mensaje: "Formulario recibido correctamente y correos enviados." });

  } catch (error) {
    console.error("❌ Error al enviar correos:", error);
    res.status(500).json({ error: "Error al enviar el mensaje." });
  }
});

export default router;





