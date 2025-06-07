import * as yup from "yup";

// Esquema para registro
export const registroSchema = yup.object().shape({
  nombre: yup
    .string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Solo letras")
    .max(15, "Máximo 15 caracteres")
    .required("El nombre es obligatorio"),
  apellido: yup
    .string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Solo letras")
    .max(15, "Máximo 15 caracteres")
    .required("El apellido es obligatorio"),
  email: yup
    .string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  password: yup
    .string()
    .min(4, "La contraseña debe tener al menos 4 caracteres")
    .required("La contraseña es obligatoria"),
  rol: yup
    .string()
    .oneOf(["Médico/a", "Admin", "Recepcionista"], "Rol inválido")
    .required("El rol es obligatorio"),
});

// Esquema para login
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  password: yup
    .string()
    .min(4, "La contraseña debe tener al menos 4 caracteres")
    .required("La contraseña es obligatoria"),
});

/// Esquema para profesional
export const profesionalSchema = yup.object().shape({
  nombre: yup
    .string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Solo letras")
    .max(15, "Máximo 15 caracteres")
    .required("El nombre es obligatorio"),
  apellido: yup
    .string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Solo letras")
    .max(15, "Máximo 15 caracteres")
    .required("El apellido es obligatorio"),
  dni: yup
    .string()
    .matches(/^\d+$/, "Solo números")
    .min(7, "DNI inválido")
    .max(10, "DNI inválido")
    .required("El DNI es obligatorio"),
  matricula: yup
  .string()
  .matches(/^(M\.P|M\.N) \d{5}$/, "Formato: M.P 12345 o M.N 12345")
  .required("La matrícula es obligatoria"),
  especialidad: yup.string().required("La especialidad es obligatoria"),
  telefono: yup
    .string()
    .matches(/^\d+$/, "Solo números")
    .min(6, "Teléfono inválido")
    .required("El teléfono es obligatorio"),
  email: yup
    .string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  tipoContrato: yup
    .string()
    .oneOf(["Planta permanente", "Contratado", "Externo"], "Tipo de contrato inválido")
    .required("El tipo de contrato es obligatorio"),
  diasHorarios: yup.string().required("Los días y horarios son obligatorios"),
  rol: yup
    .string()
    .oneOf(["Médico/a", "Admin"], "Rol inválido")
    .required("El rol es obligatorio"),
});