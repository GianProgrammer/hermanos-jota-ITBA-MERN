import express from 'express';
import User from '../models/UserM.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/authentication.js';

const router = express.Router();

// ---------------------------------------------
// REGISTRO (original)
// ---------------------------------------------
router.post('/register', async (req, res) => {
  try {
    console.log("📩 BODY RECIBIDO:", req.body);

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'El email o nombre de usuario ya está en uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "usuario",   // 👈 fijo, siempre usuario
    });

    const savedUser = await newUser.save();
    console.log("✅ GUARDADO EN MONGO:", savedUser);

    res.status(201).json({
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      role: savedUser.role,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
});

// ---------------------------------------------
// LOGIN (original)
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

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


// ---------------------------------------------
// PROFILE (original)
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


