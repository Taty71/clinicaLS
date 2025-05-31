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
        fontWeight: 500
      }}
    >
      {children}
    </div>
  );
}

export default Mensaje;