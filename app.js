const express = require('express');
require('dotenv').config(); //Cargar variables de entorno

// Importa las rutas
const clienteRoutes = require('./routes/clienteRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const notaRemisionRoutes = require('./routes/notaRemisionRoutes');
const notaServicioRoutes = require('./routes/notaServicioRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
const quejaRoutes = require('./routes/quejaRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const loginRoutes = require('./routes/authRoutes'); // Ruta de login
const protectedRoutes = require('./routes/protectedRoutes'); // Ruta protegida

const app = express();
const port = process.env.PORT || 3000;  // Usa el puerto definido en .env o el 3000 por defecto

// Middleware para parsear JSON
app.use(express.json());  // Para parsear cuerpos JSON

// Middleware para parsear datos URL encoded (como los formularios HTML)
app.use(express.urlencoded({ extended: true }));  // Para formularios URL encoded

// Monta las rutas
app.use('/api/v1/clientes', clienteRoutes);
app.use('/api/v1/usuarios', usuarioRoutes);
app.use('/api/v1/notas-remision', notaRemisionRoutes);
app.use('/api/v1/notas-servicio', notaServicioRoutes);
app.use('/api/v1/servicios', servicioRoutes);
app.use('/api/v1/quejas', quejaRoutes);
app.use('/api/v1/reportes', reporteRoutes);

// Rutas de autenticación y protección
app.use('/auth', loginRoutes); // Ruta de autenticación
app.use('/protected', protectedRoutes); // Ruta protegida con JWT

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

// Servidor en escucha
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
