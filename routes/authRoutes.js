const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UsuarioDAO = require('../dao/UsuarioDAO'); // Importar el DAO de Usuario

// Cargar la clave secreta desde las variables de entorno
const secretKey = process.env.SECRET_KEY;

// Instancia del DAO
const usuarioDAO = new UsuarioDAO();

// Ruta para autenticar y obtener un token JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar el usuario en la base de datos usando async/await
    const user = await usuarioDAO.getUsuarioByUsername(username);

    // Verificar si el usuario existe y si la contraseña es correcta
    if (!user || user.pass !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Configura la duración del token en 1 minuto (60 segundos)
    const expiresIn = 60;
    const token = jwt.sign({ userId: user.usuario }, secretKey, { expiresIn });

    // Respuesta con el token generado
    res.json({ token });
    console.log(`Token generado: ${token}`);

  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
