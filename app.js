const express = require('express');
require('dotenv').config(); // Cargar variables de entorno
const path = require('path'); // Módulo para manejar rutas
const jwt = require('jsonwebtoken');

const clienteRoutes = require('./routes/clienteRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const notaRemisionRoutes = require('./routes/notaRemisionRoutes');
const notaServicioRoutes = require('./routes/notaServicioRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
const quejaRoutes = require('./routes/quejaRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const loginRoutes = require('./routes/authRoutes'); // Ruta de login

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para formularios URL encoded
app.use(express.urlencoded({ extended: true }));

// Sirve archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para proteger rutas estáticas
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado.' });
    }
};

// Rutas API
app.use('/api/v1/clientes', clienteRoutes);
app.use('/api/v1/usuarios', usuarioRoutes);
app.use('/api/v1/notas-remision', notaRemisionRoutes);
app.use('/api/v1/notas-servicio', notaServicioRoutes);
app.use('/api/v1/servicios', servicioRoutes);
app.use('/api/v1/quejas', quejaRoutes);
app.use('/api/v1/reportes', reporteRoutes);
app.use('/api/v1', loginRoutes); // Ruta de autenticación

app.use('/css', express.static(path.join(__dirname, 'microfrontends', 'css'))); // Sirve CSS
app.use('/paginas', express.static(path.join(__dirname, 'microfrontends', 'paginas'))); // Sirve páginas HTML
app.use('/NavBarComponent', express.static(path.join(__dirname, 'microfrontends', 'NavBarComponent')));
app.use('/img', express.static(path.join(__dirname, 'microfrontends', 'img')));

// Redirige a index.html al visitar `/`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'microfrontends', 'paginas', 'index.html'));
});

// Middleware para proteger páginas específicas
const protectedPages = [
    '/index1.html',
    '/index2.html',
    '/registrarQueja.html',
    '/consultarNota.html',
    '/estadoNota.html',
    '/contacto1.html',
    '/reporteVentas.html',
    '/reporteServicios.html',
];

protectedPages.forEach((page) => {
    app.get(page, (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token || !jwt.verify(token, process.env.SECRET_KEY)) {
            return res.redirect('/inicioSesion.html'); // Redirige al login si no hay token válido
        }
        res.sendFile(path.join(__dirname, 'public', page));
    });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
