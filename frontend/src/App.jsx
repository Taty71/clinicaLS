import { useState } from "react";
import Headers from "./componentes/Headers";
import Login from "./componentes/Login";
import Register from "./componentes/Registro";
import Footer from "./componentes/Footer";
import ProfesionalesCRUD from "./paginas/ProfesionalesCRUD";
import ListaPacientes from "./componentes/ListaPacientes";
import VolverBtn from "./componentes/VolverBtn";

import "./App.css";

function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [user, setUser] = useState(null);

  if (!user) {
    if (pantalla === "login")
      return (
        <>
          <Headers />
          <div className="form-container">
            <Login onLogin={setUser} />
            <VolverBtn onClick={() => setPantalla("inicio")} />
          </div>
           <Footer />
        </>
      );
    if (pantalla === "registro")
      return (
        <>
          <Headers />
          <div className="form-container">
            <Register onRegister={() => setPantalla("login")} />
             <VolverBtn onClick={() => setPantalla("inicio")} />
          </div>
           <Footer />
        </>
      );
    return (
      <>
        <Headers />
        <div className="inicio-container">
          <div className="botones">
            <button onClick={() => setPantalla("login")}>Iniciar sesión</button>
            <button onClick={() => setPantalla("registro")}>Registrarse</button>
          </div>
        </div>
         <Footer />
      </>
    );
  }

  // Si el usuario es admin, muestra el CRUD de profesionales
  if (user.rol === "Admin") {
    return (
      <>
        <Headers />
        <h2>Bienvenido, {user.nombre} (Administrador)</h2>
        <ProfesionalesCRUD
            onVolver={() => {
              setUser(null);
              setPantalla("inicio");
            }}
          />
        <Footer />
      </>
    );
  }

  // Si el usuario es médico, muestra la lista de pacientes
  if (user.rol === "Médico/a") {
    return (
      <>
        <Headers />
        <h2>Bienvenido, Dr. {user.nombre}</h2>
         <ListaPacientes onVolver={() => {
            setUser(null);      // Cierra sesión
            setPantalla("inicio"); // Vuelve al inicio
          }} />
        <Footer />
      </>
    );
  }

  // Si el usuario es recepcionista u otro rol
  return (
    <>
      <Headers />
      <h2>Bienvenido, {user.nombre} ({user.rol})</h2>
      <Footer />
    </>
  );
}

export default App;