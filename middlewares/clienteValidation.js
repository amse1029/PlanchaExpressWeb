// middlewares/clienteValidation.js

const { body, validationResult } = require('express-validator');

const validarCliente = [
    body('nombre')
        .isString().withMessage('El nombre debe ser un texto')
        .notEmpty().withMessage('El nombre es obligatorio')
        .trim()
        .escape()
        .matches(/^[a-zA-Z\s]+$/).withMessage('El nombre no puede contener números o caracteres especiales'),
    
    body('apellido')
        .isString().withMessage('El apellido debe ser un texto')
        .notEmpty().withMessage('El apellido es obligatorio')
        .trim()
        .escape()
        .matches(/^[a-zA-Z\s]+$/).withMessage('El apellido no puede contener números o caracteres especiales'),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errors: errores.array() });
        }
        next();
    }
];

module.exports = validarCliente;
