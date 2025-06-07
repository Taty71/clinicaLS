import VolverBtn from "./VolverBtn";

function ListaProfesionales({ profesionales, onVolver }) {
  return (
    <div>
      <h2>Lista de Profesionales</h2>
       <VolverBtn onClick={onVolver} />
      <ul>
        {profesionales.map(prof => (
          <li key={prof._id}>
            <b>{prof.nombre} {prof.apellido}</b> - DNI: {prof.dni} - Matrícula: {prof.matricula} - Especialidad: {prof.especialidad} - Tel: {prof.telefono} - Email: {prof.email} - Contrato: {prof.tipoContrato} - Días y Horarios: {prof.diasHorarios} - Rol: {prof.rol}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ListaProfesionales;