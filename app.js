const express = require('express');
const bodyParser = require('body-parser');

// Importa las rutas
const clienteRoutes = require('./routes/clienteRoutes');
const notaRemisionRoutes = require('./routes/notaRemisionRoutes');
const notaServicioRoutes = require('./routes/notaServicioRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
const quejaRoutes = require('./routes/quejaRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Monta las rutas
app.use('/api/v1/clientes', clienteRoutes);
app.use('/api/v1/notas-remision', notaRemisionRoutes);
app.use('/api/v1/notas-servicio', notaServicioRoutes);
app.use('/api/v1/servicios', servicioRoutes);
app.use('/api/v1/quejas', quejaRoutes);
app.use('/api/v1/reportes', reporteRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

// Servidor en escucha
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
