import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String },
  email: { type: String },
  telefono: { type: String },
  fechaNacimiento: { type: Date }
});

const Paciente = mongoose.model("Paciente", pacienteSchema);
export default Paciente;