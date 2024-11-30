const express = require('express');
const notaRemisionController = require('../controllers/notaRemisionController');
const validarNotaRemision = require('../middlewares/notaRemisionValidation'); // Importa el middleware
const router = express.Router();

router.get('/', notaRemisionController.listarNotas);
router.post('/', validarNotaRemision, notaRemisionController.agregarNota); 
router.post('/consultarNota', notaRemisionController.consultarNota);

module.exports = router;
