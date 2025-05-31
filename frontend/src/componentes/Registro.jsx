import { useState } from "react";
import { registroSchema } from "../utils/validacionesYup";

function Register({ onRegister }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rol: "Médico/a"
  });
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [errores, setErrores] = useState({});
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setOk("");
    try {
      await registroSchema.validate(form, { abortEarly: false });
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setOk("¡Registro exitoso! Ahora puedes iniciar sesión.");
        onRegister && onRegister();
      } else {
        setError(data.mensaje || "Error al registrar");
      }
    } catch  (validationError){
      if (validationError.inner) {
        // Mapea los errores de Yup a un objeto
        const nuevoErrores = {};
        validationError.inner.forEach(err => {
          nuevoErrores[err.path] = err.message;
        });
        setErrores(nuevoErrores);
      } else {
        setError("Error de red");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
      {errores.nombre && <span className="error">{errores.nombre}</span>}
      <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
      {errores.apellido && <span className="error">{errores.apellido}</span>}
      <input name="email" type="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
      {errores.email && <span className="error">{errores.email}</span>}
      <input name="password" type="password" placeholder="password" value={form.password} onChange={handleChange} required />
      {errores.password && <span className="error">{errores.password}</span>}
      <select name="rol" value={form.rol} onChange={handleChange}>
        <option value="Médico/a">Médico/a</option>
        <option value="Admin">Admin</option>
        <option value="Recepcionista">Recepcionista</option>
      </select>
      {errores.rol && <span className="error">{errores.rol}</span>}
      <button type="submit">Registrarse</button>
      {error && <p style={{color:"red"}}>{error}</p>}
      {ok && <p style={{color:"green"}}>{ok}</p>}
    </form>
  );
}

export default Register;
