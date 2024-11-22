const express = require('express');
const quejaController = require('../controllers/quejaController');
const validarQueja = require('../middlewares/quejaValidation'); // Importa el middleware
const { verifyToken, verifyRole } = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/', verifyToken, verifyRole('admin'), async (req, res) => {}, quejaController.listarQuejas);
router.post('/',  quejaController.agregarQueja);

module.exports = router;