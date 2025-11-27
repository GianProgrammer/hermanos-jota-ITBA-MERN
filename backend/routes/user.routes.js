import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/authentication.js';

const router = express.Router();

// ---------------------------------------------
// REGISTRO
// ---------------------------------------------
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'El email o nombre de usuario ya está en uso.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      _id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
    });

  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
});


// ---------------------------------------------
// LOGIN (📌 SOLO HEADER, SIN COOKIES)
// ---------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // ⬇ GENERAR JWT (para Header)
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ⬇ NO MÁS COOKIES, SOLO JSON
    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      }
    });

  } catch (error) {
    console.error("❌ Error en /login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


// ---------------------------------------------
// PROFILE (ruta protegida)
// ---------------------------------------------
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
});

export default router;
