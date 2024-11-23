const express = require('express');
const quejaController = require('../controllers/quejaController');
const validarQueja = require('../middlewares/quejaValidation'); // Importa el middleware
const { verifyToken, verifyRole } = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/', quejaController.listarQuejas);
router.post('/',  quejaController.agregarQueja);

module.exports = router;