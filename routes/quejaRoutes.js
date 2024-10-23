const express = require('express');
const quejaController = require('../controllers/quejaController');
const validarQueja = require('../middlewares/quejaValidation'); // Importa el middleware
const router = express.Router();

router.get('/', quejaController.listarQuejas);
router.post('/', validarQueja, quejaController.agregarQueja); // Añade el middleware aquí

module.exports = router;