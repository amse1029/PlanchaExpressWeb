const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const validarUsuario = require('../middlewares/usuarioValidation'); // Importa el middleware
const router = express.Router();

router.get('/', usuarioController.getAllUsuarios);
router.post('/', validarUsuario, usuarioController.addUsuario); // Añade el middleware aquí

module.exports = router;