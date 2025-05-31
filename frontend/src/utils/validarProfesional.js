export default function validarProfesional(form) {
  const errores = {};
  if (!form.nombre) errores.nombre = "Nombre requerido";
  if (!form.apellido) errores.apellido = "Apellido requerido";
  if (!form.dni) errores.dni = "DNI requerido";
  if (!form.matricula) errores.matricula = "Matrícula requerida";
  if (!form.especialidad) errores.especialidad = "Especialidad requerida";
  if (!form.telefono) errores.telefono = "Teléfono requerido";
  if (!form.email) errores.email = "Email requerido";
  if (!form.tipoContrato) errores.tipoContrato = "Tipo de contrato requerido";
  if (!form.diasHorarios) errores.diasHorarios = "Días y horarios requeridos";
  return errores;
}