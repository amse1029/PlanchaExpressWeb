// middlewares/notaRemisionValidation.js

const { body, validationResult } = require('express-validator');

const validarNotaRemision = [
    body('idCliente')
        .isInt({ gt: 0 }).withMessage('El ID del cliente debe ser un número entero positivo'),

    body('fechaEntrega')
        .isISO8601().withMessage('La fecha de entrega debe ser una fecha válida (formato: YYYY-MM-DD)')
        .custom(value => {
            if (new Date(value) <= new Date()) {
                throw new Error('La fecha de entrega debe ser posterior a la fecha actual');
            }
            return true;
        }),

    body('total')
        .isFloat({ gt: 0 }).withMessage('El total debe ser un número decimal positivo'),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errors: errores.array() });
        }
        next();
    }
];

module.exports = validarNotaRemision;
