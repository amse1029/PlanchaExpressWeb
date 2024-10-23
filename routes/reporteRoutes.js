const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reporteController');
const validarReporte = require('../middlewares/reporteValidation'); // Importa el middleware

// Ruta para el reporte de servicios
router.get('/servicios/:filtroFecha', validarReporte, reportController.reporteServicios); // Añade el middleware aquí

// Ruta para el reporte de ventas
router.get('/ventas/:filtroFecha', validarReporte, reportController.reporteVentas); // Añade el middleware aquí

module.exports = router;
