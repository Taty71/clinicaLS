import React, { useState, useEffect } from "react";
import { profesionalSchema } from "../utils/validacionesYup";
import Mensaje from "./Mensaje";
import VolverBtn from "./VolverBtn";



function FormProfesional({ form, setForm, onSubmit, editId, onCancel, onVolver, setMensaje }) {
  const [errores, setErrores] = useState({});


  useEffect(() => {
  setErrores({});

  }, [form, editId]);

const handleChange = e => {
  setForm(f => ({ ...f, [e.target.name]: e.target.value.trimStart() }));
  setErrores({ ...errores, [e.target.name]: "" });
 
};

const handleSubmit = async e => {
  e.preventDefault();
  try {
    await profesionalSchema.validate(form, { abortEarly: false });
    // Validación de unicidad (AJAX al backend)
    let url = (`/api/profesionales/exists?dni=${form.dni}&matricula=${form.matricula}`);
     if (editId) url += `&id=${editId}`;
      
    
    const res = await fetch(url);
    const data = await res.json();
    if (data.dniExiste) {
      setErrores(prev => ({ ...prev, dni: "El DNI ya está registrado" }));
        setMensaje && setMensaje({ tipo: "error", texto: "DNI O MATRICULA EXISTENTE" });

      return;
    }
    if (data.matriculaExiste) {
      setErrores(prev => ({ ...prev, matricula: "La matrícula ya está registrada" }));
        setMensaje && setMensaje({ tipo: "error", texto: "DNI O MATRICULA EXISTENTE" });

      return;
    }

    await onSubmit(); // onSubmit debe devolver true/false según éxito
    
  } catch (validationError) {
    if (validationError.inner) {
      const nuevoErrores = {};
      validationError.inner.forEach(err => {
        nuevoErrores[err.path] = err.message;
      });
      setErrores(nuevoErrores);
    }
      setMensaje && setMensaje({ tipo: "error", texto: "Corrige los errores del formulario." });

  }
};

  return (
    <>
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }} className="form-grid">
  
      <div className="form-group">
        <label>Nombre:</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} />
        {errores.nombre && <span className="error">{errores.nombre}</span>}
      </div>

      <div className="form-group">
        <label>Apellido:</label>
        <input name="apellido" value={form.apellido} onChange={handleChange} />
        {errores.apellido && <span className="error">{errores.apellido}</span>}
      </div>

      <div className="form-group">
        <label>DNI:</label>
        <input name="dni" value={form.dni} onChange={handleChange} type="text"
          placeholder="Ej: 12345678" />
        {errores.dni && <span className="error">{errores.dni}</span>}
      </div>

      <div className="form-group">
        <label>Matrícula:</label>
        <input name="matricula" value={form.matricula} onChange={handleChange} type="text"
        placeholder="Ej: M.P 12345"/>
        {errores.matricula && <span className="error">{errores.matricula}</span>}
      </div>

      <div className="form-group">
        <label>Especialidad:</label>
        <input name="especialidad" value={form.especialidad} onChange={handleChange} />
        {errores.especialidad && <span className="error">{errores.especialidad}</span>}
      </div>

      <div className="form-group">
        <label>Teléfono:</label>
        <input name="telefono" value={form.telefono} onChange={handleChange} />
        {errores.telefono && <span className="error">{errores.telefono}</span>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} />
        {errores.email && <span className="error">{errores.email}</span>}
      </div>

      <div className="form-group">
        <label>Tipo de Contrato:</label>
        <select name="tipoContrato" value={form.tipoContrato} onChange={handleChange}>
          <option value="">Seleccione...</option>
          <option value="Planta permanente">Planta permanente</option>
          <option value="Contratado">Contratado</option>
          <option value="Externo">Externo</option>
        </select>
        {errores.tipoContrato && <span className="error">{errores.tipoContrato}</span>}
      </div>

      <div className="form-group">
        <label>Días y Horarios:</label>
        <input name="diasHorarios" value={form.diasHorarios} onChange={handleChange} />
        {errores.diasHorarios && <span className="error">{errores.diasHorarios}</span>}
      </div>

      <div className="form-group">
        <label>Rol:</label>
        <select name="rol" value={form.rol} onChange={handleChange}>
          <option value="Médico/a">Médico/a</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="button-group">
        <button type="submit" className="btn-primary">
          {editId ? "Actualizar" : "Registrar"}
        </button>
        {editId && <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>}
      </div>
      
</form>
<VolverBtn onClick={onVolver} />
</>
  );
}

export default FormProfesional;