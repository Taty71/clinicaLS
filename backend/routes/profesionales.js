import { Router } from "express";
import Profesional from "../models/Profesional.js";
import bcrypt from "bcryptjs";
//import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import { proteger, permisoRol } from "../middleware/authMiddleware.js";
const router = Router();

router.get('/', proteger, permisoRol('Admin'), async (req, res)  => {
  const profesionales = await Profesional.find(); // Quita { activo: true }
  res.json(profesionales);
});

router.get('/exists', async (req, res) => {
  const { dni, matricula, id } = req.query;
  let dniExiste = false;
  let matriculaExiste = false;
  if (dni) {
    dniExiste = await Profesional.exists(
      id ? { dni, _id: { $ne: id } } : { dni }
    );
  }
  if (matricula) {
    matriculaExiste = await Profesional.exists(
      id ? { matricula, _id: { $ne: id } } : { matricula }
    );
  }
  res.json({ dniExiste: !!dniExiste, matriculaExiste: !!matriculaExiste });
});

router.post('/', proteger, permisoRol('Admin'), async (req, res) => {
  try {
    const data = req.body;

    // Validación de campos obligatorios
    const camposObligatorios = [
      "nombre", "apellido", "dni", "matricula", "especialidad",
      "telefono", "email", "tipoContrato", "diasHorarios"
    ];
    for (const campo of camposObligatorios) {
      if (!data[campo]) {
        return res.status(400).json({ error: `El campo ${campo} es obligatorio` });
      }
    }

   // Validar unicidad de DNI, matrícula y email
    const existeDni = await Profesional.findOne({ dni: data.dni });
    if (existeDni) {
      return res.status(400).json({ error: "El DNI ya está registrado" });
    }
    const existeEmail = await Profesional.findOne({ email: data.email });
    if (existeEmail) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Password igual al dni, encriptado
    data.password = await bcrypt.hash(data.dni, 10);

    await Profesional.create(data);
    res.status(201).json({ message: 'Profesional creado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo crear el profesional', detalle: error.message });
  }
});

router.put('/:id', proteger, permisoRol('Admin'), async (req, res) => {
  // No se actualiza el password aquí
  const { password, ...rest } = req.body;
  try {
    // Validación de campos obligatorios (puedes omitir si solo se actualizan algunos campos)
     if (rest.dni) {
      const existeDni = await Profesional.findOne({ dni: rest.dni, _id: { $ne: req.params.id } });
      if (existeDni) {
        return res.status(400).json({ error: "El DNI ya está registrado" });
      }
    }
    // Validar unicidad de matrícula y email si se modifican
    if (rest.matricula) {
      const existeMatricula = await Profesional.findOne({ matricula: rest.matricula, _id: { $ne: req.params.id } });
      if (existeMatricula) {
        return res.status(400).json({ error: "La matrícula ya está registrada" });
      }
    }
    if (rest.email) {
      const existeEmail = await Profesional.findOne({ email: rest.email, _id: { $ne: req.params.id } });
      if (existeEmail) {
        return res.status(400).json({ error: "El email ya está registrado" });
      }
    }
    await Profesional.findByIdAndUpdate(req.params.id, rest);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo actualizar el profesional', detalle: error.message });
  }
});

router.delete('/:id', proteger, permisoRol('Admin'), async (req, res) => {
  await Profesional.findByIdAndUpdate(req.params.id, { activo: false });
  res.json({ message: 'Profesional dado desactivado' });
});
router.put('/activar/:id', proteger, permisoRol('Admin'), async (req, res) => {
  try {
    const profesional = await Profesional.findByIdAndUpdate(
      req.params.id,
      { activo: true },
      { new: true }
    );
    if (!profesional) return res.status(404).json({ error: "No encontrado" });
    res.json({ mensaje: "Profesional activado", profesional });
  } catch (error) {
    res.status(500).json({ error: "Error al activar profesional" });
  }
});
export default router;