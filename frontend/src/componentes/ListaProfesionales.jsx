import { useState } from "react";
import VolverBtn from "./VolverBtn";

function ListaProfesionales({ profesionales, onVolver, onActivar }) {
  const [mostrarInactivos, setMostrarInactivos] = useState(false);

  const lista = profesionales.filter(prof =>
    mostrarInactivos ? prof.activo === false : prof.activo !== false
  );

  return (
    <div>
      <h2>Lista de Profesionales</h2>
      <VolverBtn onClick={onVolver} />
      <button
        style={{ margin: "12px 0" }}
        onClick={() => setMostrarInactivos(v => !v)}
      >
        {mostrarInactivos ? "Mostrar Activos" : "Mostrar Inactivos"}
      </button>
      <ul>
        {lista.length === 0 && (
          <li>No hay profesionales {mostrarInactivos ? "inactivos" : "activos"}.</li>
        )}
        {lista.map(prof => (
          <li key={prof._id}>
            <b>{prof.nombre} {prof.apellido}</b> - DNI: {prof.dni} - Matrícula: {prof.matricula} - Especialidad: {prof.especialidad} - Tel: {prof.telefono} - Email: {prof.email} - Contrato: {prof.tipoContrato} - Días y Horarios: {prof.diasHorarios} - Rol: {prof.rol}
            {mostrarInactivos && (
              <button
                style={{ marginLeft: 12 }}
                onClick={() => onActivar && onActivar(prof._id)}
              >
                Activar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProfesionales;