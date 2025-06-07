import React from "react";

function AyudaProfesionales({ visible, onClose }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)",
      zIndex: 2000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 10,
        padding: 32,
        maxWidth: 500,
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        position: "relative"
      }}>
        <button
          style={{
            position: "absolute",
            top: 10,
            right: 16,
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer"
          }}
          onClick={onClose}
          aria-label="Cerrar ayuda"
        >✖</button>
        <h3>¿Cómo cargar un profesional?</h3>
        <ul style={{ textAlign: "left", fontSize: "1.1rem" }}>
          <li><b>Nombre/Apellido:</b> Solo letras, sin números ni símbolos.</li>
          <li><b>DNI:</b> Solo números, sin puntos ni guiones. Ejemplo: <code>12345678</code></li>
          <li><b>Matrícula:</b> Formato <b>M.P</b> seguido de 5 números. Ejemplo: <code>M.P 12345</code></li>
          <li><b>Especialidad:</b> Nombre de la especialidad médica.</li>
          <li><b>Teléfono:</b> Solo números, puede incluir código de área. Ejemplo: <code>3511234567</code></li>
          <li><b>Email:</b> Formato válido de correo electrónico.</li>
          <li><b>Tipo de Contrato:</b> Selecciona una opción del listado.</li>
          <li><b>Días y Horarios:</b> Describe los días y horarios de atención.</li>
          <li><b>Rol:</b> Selecciona "Médico/a" o "Admin".</li>
        </ul>
        <p style={{ marginTop: 16, color: "#1976d2" }}>
          <b>Nota:</b> Todos los campos son obligatorios.
        </p>
      </div>
    </div>
  );
}

export default AyudaProfesionales;