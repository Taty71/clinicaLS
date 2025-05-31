import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const generarToken = (user) => {
  return jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const registrar = async (req, res) => {
  try {
    const { nombre,apellido, email, password, rol } = req.body;
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: "El usuario ya existe" });

    const nuevoUsuario = new User({ nombre, apellido, email, password, rol });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error en el registro", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ mensaje: "Credenciales inválidas" });

    const esValido = await bcrypt.compare(password, user.password);
    if (!esValido) return res.status(400).json({ mensaje: "password incorrecta" });

    const token = generarToken(user);
    res.json({ token, user: { nombre: user.nombre, apellido: user.apellido, email: user.email, rol: user.rol } });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al iniciar sesión", error: err.message });
  }
};