const { body, validationResult } = require('express-validator');

const validarServicio = [
    body('descripcion')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('La descripción debe ser un texto no vacío.')
        .matches(/^[a-zA-Z0-9\s.,-]*$/) // Permite letras, números y algunos caracteres
        .withMessage('La descripción solo puede contener letras, números, espacios, puntos, comas y guiones.'),

    body('precio')
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser un número decimal positivo.'),

    body('cantidad')
        .isInt({ gt: 0 })
        .withMessage('La cantidad debe ser un número entero positivo.'),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errors: errores.array() });
        }
        next();
    }
];

module.exports = validarServicio;