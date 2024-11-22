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
  const { email, password } = req.body;

  try {
    // Buscar al usuario (cliente o admin) en las bases de datos
    let user = await usuarioDAO.getClienteByEmail(email);
    let role = 'client'; // Por defecto, asumimos que es cliente

    if (!user) {
      // Si no es cliente, verificar si es admin
      user = await usuarioDAO.getAdminByEmail(email);
      role = 'admin';
    }

    // Validar si se encontró un usuario válido
    if (!user || user.pass !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear el payload del token
    const payload = {
      nombre: role === 'client' ? user.nombre : user.usuario, // Usar 'nombre' como clave
      role, // Rol del usuario
      id: user.id,
    };

    // Generar el token
    const token = jwt.sign(payload, secretKey, { expiresIn: '600' }); // Expira en 10 minutos
    res.json({ token });

    console.log(`Token generado: ${token}`);
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
