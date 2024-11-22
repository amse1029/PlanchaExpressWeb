const jwt = require('jsonwebtoken');

// Middleware para verificar el token
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido o expirado' });
        }

        req.user = decoded; // Guardar el token decodificado
        next();
    });
}

function verifyRole(requiredRole) {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ error: 'Acceso no autorizado' });
        }
        next();
    };
}

module.exports = { verifyToken, verifyRole };

