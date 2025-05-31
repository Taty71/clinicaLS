import { useState } from "react";
import { loginSchema } from "../utils/validacionesYup";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errores, setErrores] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrores({});
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        onLogin && onLogin(data.user);
      } else {
        setError(data.mensaje || "Error al iniciar sesión");
      }
    } catch (validationError) {
      if (validationError.inner) {
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
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      {errores.email && <span className="error">{errores.email}</span>}
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {errores.password && <span className="error">{errores.password}</span>}
      <button type="submit">Entrar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default Login;