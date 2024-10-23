const express = require('express');
const notaRemisionController = require('../controllers/notaRemisionController');
const validarNotaRemision = require('../middlewares/notaRemisionValidation'); // Importa el middleware
const router = express.Router();

router.get('/', notaRemisionController.listarNotas);
router.post('/', validarNotaRemision, notaRemisionController.agregarNota); // Añade el middleware aquí

module.exports = router;
