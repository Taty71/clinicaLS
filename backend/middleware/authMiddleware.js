import jwt from "jsonwebtoken";

export function proteger(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer token"
  if (!token) return res.status(401).json({ mensaje: 'No autorizado' });

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decodificado;
    next();
  } catch (err) {
    res.status(403).json({ mensaje: 'Token inválido' });
  }
}

export function permisoRol(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado para este rol' });
    }
    next();
  };
}