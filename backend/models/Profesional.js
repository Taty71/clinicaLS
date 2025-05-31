import mongoose from "mongoose";
const ProfesionalSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true },
  matricula: { type: String, required: true, unique: true }, // Unicidad
  especialidad: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String,
  tipoContrato: { type: String, enum: ['Planta permanente', 'Contratado', 'Externo'], required: true },
  diasHorarios: { type: String, required: true },
  rol: { type: String, enum: ['Admin', 'Médico/a'], default: 'Médico/a' },
  activo: { type: Boolean, default: true } // Baja lógica
});
const Profesional = mongoose.model('Profesional', ProfesionalSchema, 'profesionales');
export default Profesional;
