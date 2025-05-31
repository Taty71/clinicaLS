import { Router } from "express";
import Paciente from "../models/Pacientes.js";
import { proteger, permisoRol } from "../middleware/authMiddleware.js";

const router = Router();

// Obtener todos los pacientes (solo médicos y admin)
router.get("/", proteger, permisoRol("Médico/a", "Admin"), async (req, res) => {
  const pacientes = await Paciente.find();
  res.json(pacientes);
});

// Puedes agregar más rutas (crear, editar, eliminar) si lo necesitas

export default router;