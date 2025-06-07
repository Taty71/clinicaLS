import { useState, useEffect } from "react";
import FormProfesional from "../componentes/FormProfesional";
import "../estilos/ProfesionalesCRUD.css";
import VolverBtn from "../componentes/VolverBtn";
import Mensaje from "../componentes/Mensaje"; // Importa el componente
import AyudaProfesionales from "../componentes/AyudaProfesionales";
import ListaProfesionales from "../componentes/ListaProfesionales";
function ProfesionalesCRUD({ onVolver }) {
  const [profesionales, setProfesionales] = useState([]);
  const [form, setForm] = useState({
    nombre: "", apellido: "", dni: "", matricula: "", especialidad: "",
    telefono: "", email: "", tipoContrato: "", diasHorarios: "", rol: "Médico/a"
  });
  const [editId, setEditId] = useState(null);
  const [mensaje, setMensaje] = useState(null); // Estado para el mensaje
  const [showAyuda, setShowAyuda] = useState(false);
  const [verLista, setVerLista] = useState(false);

   useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);


  // Obtener la lista
  const fetchProfesionales = () => {
      fetch("/api/profesionales", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(res => res.json())
        .then(data => {
          // Si data no es array, pon un array vacío
          setProfesionales(Array.isArray(data) ? data : []);
        });
    };
    useEffect(() => {
    fetchProfesionales();
    }, []);


  // Crear o editar profesional
 const handleSubmit = async () => {
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/profesionales/${editId}` : "/api/profesionales";
    const body = { ...form, password: form.dni };
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      fetchProfesionales();
      setForm({
        nombre: "", apellido: "", dni: "", matricula: "", especialidad: "",
        telefono: "", email: "", tipoContrato: "", diasHorarios: "", rol: "Médico/a"
      });
      setEditId(null);
      setMensaje({ tipo: "exito", texto: editId ? "¡Profesional Actualizado correctamente!" : "¡Profesional Registrado correctamente!" }); // Mensaje

       return true;
    } else {
      setMensaje({ tipo: "error", texto: data.error || data.detalle || "Error" });

      return false;
    }
  } catch {
    setMensaje({ tipo: "error", texto: "Error de red" });

    return false; // <--- ¡IMPORTANTE!
  }
};

  // Eliminar profesional
  // Baja lógica: marcar como inactivo en vez de eliminar físicamente
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas dar de baja este profesional?")) return;
    try {
      const res = await fetch(`/api/profesionales/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ activo: false }),
      });
      if (res.ok) {
        setMensaje({ tipo: "exito", texto: "¡Profesional dado de baja correctamente, quedando desactivo!" });
        fetchProfesionales();
      } else {
        setMensaje({ tipo: "error", texto: "No se pudo dar de baja el profesional." });
      }
    } catch {
      setMensaje({ tipo: "error", texto: "Error de red al eliminar." });
    }
  };
  // Editar profesional (cargar datos en el form)
  const handleEdit = (prof) => {
    setForm({
      nombre: prof.nombre || "",
      apellido: prof.apellido || "",
      dni: prof.dni || "",
      matricula: prof.matricula || "",
      especialidad: prof.especialidad || "",
      telefono: prof.telefono || "",
      email: prof.email || "",
      tipoContrato: prof.tipoContrato || "",
      diasHorarios: prof.diasHorarios || "",
      rol: prof.rol || "Médico/a"
    });
    setEditId(prof._id);
  };

  return (
    <div>
       {!verLista ? (
        <>
      <h2>Profesionales</h2>
      <VolverBtn onClick={onVolver} />
      <button
        className="btn-ayuda"
        style={{ marginBottom: 16, float: "right" }}
        onClick={() => setShowAyuda(true)}
      >
        🛈 Ayuda
      </button>
      <AyudaProfesionales visible={showAyuda} onClose={() => setShowAyuda(false)} />
     
      {/* Mensaje flotante abajo a la derecha */}
          {mensaje && (
            <div style={{
              position: "fixed",
              right: 24,
              bottom: 200,
              zIndex: 1000,
              minWidth: 300,
              maxWidth: 400
            }}>
              <Mensaje tipo={mensaje.tipo}>{mensaje.texto}</Mensaje>
            </div>
          )}

      <FormProfesional
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        editId={editId}
     
        onCancel={() => {
          setEditId(null);
          setForm({
            nombre: "", apellido: "", dni: "", matricula: "", especialidad: "",
            telefono: "", email: "", tipoContrato: "", diasHorarios: "", rol: "Médico/a"
          });
      }}
      onVolver={onVolver}
      setMensaje={setMensaje} 
      />
      <button
            className="btn-ver-lista"
            style={{ marginTop: 16 }}
            onClick={() => setVerLista(true)}
          >
            Ver lista de profesionales
          </button>

          <div className="prof-list">
         
          {(Array.isArray(profesionales) ? profesionales : []).map(prof => (
            <div className="prof-card" key={prof._id}>
              <h3>{prof.nombre} {prof.apellido}</h3>
              <p><strong>DNI:</strong> {prof.dni}</p>
              <p><strong>Matrícula:</strong> {prof.matricula}</p>
              <p><strong>Especialidad:</strong> {prof.especialidad}</p>
              <p><strong>Teléfono:</strong> {prof.telefono}</p>
              <p><strong>Email:</strong> {prof.email}</p>
              <p><strong>Contrato:</strong> {prof.tipoContrato}</p>
              <p><strong>Días y Horarios:</strong> {prof.diasHorarios}</p>
              <p><strong>Rol:</strong> {prof.rol}</p>
              <div className="card-buttons">
                <button className="btn-edit" onClick={() => handleEdit(prof)}>✏️ Editar</button>
                <button className="btn-delete" onClick={() => handleDelete(prof._id)}>🗑️ Eliminar</button>
              </div>
            </div>
          ))}
        </div>
        </>
      ) : (
        <ListaProfesionales
          profesionales={profesionales}
          onVolver={() => setVerLista(false)}
        />
      )}

      
          
    </div>
  );
}

export default ProfesionalesCRUD;