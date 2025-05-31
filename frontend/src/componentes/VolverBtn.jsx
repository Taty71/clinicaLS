function VolverBtn({ onClick }) {
  const handleClick = onClick || (() => window.history.back());

  return (
    <button type="button" className="volver-btn" onClick={handleClick}>
      Volver
    </button>
  );
}

export default VolverBtn;

