const express = require('express');
const servicioController = require('../controllers/servicioController');
const router = express.Router();
const validarServicio = require('../middlewares/servicioValidation'); // Importa el middleware

router.get('/', servicioController.listarServicios);
router.post('/', validarServicio, servicioController.agregarServicio); // Añade el middleware aquí

module.exports = router;