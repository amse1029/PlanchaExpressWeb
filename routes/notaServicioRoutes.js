const express = require('express');
const notaServicioController = require('../controllers/notaServicioController');
const validarNotaServicio = require('../middlewares/notaServicioValidation'); // Importa el middleware
const router = express.Router();

router.get('/', notaServicioController.listarNotasServicios);
router.post('/', validarNotaServicio, notaServicioController.agregarNotaServicio); // Añade el middleware aquí

module.exports = router;