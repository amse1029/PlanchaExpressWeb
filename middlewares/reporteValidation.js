const { param, validationResult } = require('express-validator');

const validarReporte = [
    param('filtroFecha')
        .isIn(['diario', 'semanal', 'mensual'])
        .withMessage('El filtro de fecha debe ser "diario", "semanal" o "mensual".'),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errors: errores.array() });
        }
        next();
    }
];

module.exports = validarReporte;