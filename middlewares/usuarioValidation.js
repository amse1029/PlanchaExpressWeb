// middlewares/usuarioValidation.js

const { body, validationResult } = require('express-validator');

const validarUsuario = [
    body('usuario')
        .isString().withMessage('El usuario debe ser un texto')
        .notEmpty().withMessage('El usuario es obligatorio')
        .trim()
        .escape()
        .isLength({ min: 3 }).withMessage('El usuario debe tener al menos 3 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('El usuario solo puede contener letras, números y guiones bajos'),

    body('pass')
        .isString().withMessage('La contraseña debe ser un texto')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .trim()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errors: errores.array() });
        }
        next();
    }
];

module.exports = validarUsuario;
