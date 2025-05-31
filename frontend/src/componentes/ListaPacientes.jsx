import { useEffect, useState } from "react";
import VolverBtn from "./VolverBtn";

function ListaPacientes({ onVolver }) {
  const [pacientes, setPacientes] = useState([]);

  // El handler onVolver puede ir dentro de VolverBtn para encapsular la lógica de volver.
  // Así, aquí solo pasas la prop onClick si necesitas lógica personalizada.

  useEffect(() => {
    fetch("/api/pacientes", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(res => res.json())
      .then(data => setPacientes(data));
  }, []);

  return (
    <div>
      <h2>Pacientes</h2>
      <VolverBtn onClick={onVolver} />
      <ul>
        {pacientes.map(pac => (
          <li key={pac._id}>{pac.nombre} {pac.apellido}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPacientes;