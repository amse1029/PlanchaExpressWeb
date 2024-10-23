const { body, validationResult } = require('express-validator');

const validarNotaServicio = [
    body('idNota')
        .isInt({ gt: 0 }).withMessage('El ID de la nota debe ser un número entero positivo'),

    body('idServicio')
        .isInt({ gt: 0 }).withMessage('El ID del servicio debe ser un número entero positivo'),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errors: errores.array() });
        }
        next();
    }
];

module.exports = validarNotaServicio;