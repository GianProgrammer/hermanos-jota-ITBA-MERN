// backend/routes/contacto.routes.js
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const datos = req.body;
  console.log("📩 Mensaje recibido del formulario:", datos);

  try {
    // Configurar transporte de correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Contenido del correo
    const mailOptions = {
      from: `"Hermanos Jota" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // te lo manda a vos
      subject: `Nuevo mensaje de ${datos.nombre}`,
      html: `
        <h2>📨 Nuevo mensaje desde el formulario</h2>
        <p><strong>Nombre:</strong> ${datos.nombre}</p>
        <p><strong>Email:</strong> ${datos.email}</p>
        <p><strong>Tel:</strong> ${datos.tel || "No especificado"}</p>
        <p><strong>Cel:</strong> ${datos.cel || "No especificado"}</p>
        <p><strong>Provincia:</strong> ${datos.provincia}</p>
        <p><strong>Ciudad:</strong> ${datos.ciudad}</p>
        <p><strong>Motivo:</strong> ${datos.motivo}</p>
        <p><strong>Mensaje:</strong><br/>${datos.mensaje}</p>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado correctamente");

    res.json({ mensaje: "Formulario recibido y correo enviado correctamente" });
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error.message);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
});

export default router;




