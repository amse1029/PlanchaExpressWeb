const { body, validationResult } = require('express-validator');

const validarQueja = [
    body('mensaje')
        .trim()
        .notEmpty().withMessage('El mensaje no puede estar vacío.')
        .isLength({ min: 5 }).withMessage('El mensaje debe tener al menos 5 caracteres.'),
    
    body('idCliente')
        .isInt({ gt: 0 }).withMessage('El ID del cliente debe ser un número entero positivo'),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errors: errores.array() });
        }
        next();
    }
];

module.exports = validarQueja;