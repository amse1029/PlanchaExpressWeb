const express = require('express');
const clienteController = require('../controllers/clienteController');
const validarCliente = require('../middlewares/clienteValidation'); // Importa el middleware
const router = express.Router();

router.get('/', clienteController.listarClientes);
router.post('/', validarCliente, clienteController.agregarCliente); // Añade el middleware aquí

module.exports = router;