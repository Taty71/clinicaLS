function Mensaje({ tipo = "info", children }) {
  const colores = {
    exito: "#4caf50",
    error: "#e53935",
    info: "#1976d2"
  };
  return (
    <div
      style={{
        background: colores[tipo] + "22",
        color: colores[tipo],
        border: `1px solid ${colores[tipo]}`,
        borderRadius: 8,
        padding: "10px 16px",
        margin: "12px 0",
        textAlign: "center",
        fontWeight: 500,
        fontSize: "1.5rem",
        boxShadow: "0 4px 16px rgba(17, 85, 5, 0.18)",
        textShadow: "2px 2px 6px rgba(10, 94, 30, 0.7)"
      }}
    >
      {children}
    </div>
  );
}

export default Mensaje;