const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UsuarioDAO = require('../dao/UsuarioDAO'); // Importar el DAO de Usuario
require('dotenv').config(); // Cargar variables de entorno

// Cargar la clave secreta desde las variables de entorno
const secretKey = process.env.SECRET_KEY;

// Instancia del DAO
const usuarioDAO = new UsuarioDAO();

// Ruta para autenticar y obtener un token JWT
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Buscar el usuario en la base de datos
  usuarioDAO.getUsuarioByUsername(username, (user) => {
    if (!user || user.pass !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Configura la duración de 1 minuto en segundos
    const expiresIn = 60; // 60 segundos (1 minuto)
    const token = jwt.sign({ userId: user.usuario }, secretKey, { expiresIn });

    // Respuesta con el token generado
    res.json({ token });
    console.log(`Token generado: ${token}`);
  });
});

module.exports = router;
