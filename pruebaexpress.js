const express = require('express');
const app = express();

const readline = require('readline');
const ClienteDAO = require('./dao/ClienteDAO');
const NotaRemisionDAO = require('./dao/NotaRemisionDAO');
const NotaServicioDAO = require('./dao/NotaServicioDAO');
const ServicioDAO = require('./dao/ServicioDAO');
const QuejaDAO = require('./dao/QuejaDAO');
const ReporteServicios = require('./ReporteServicios');
const ReporteVentas = require('./ReporteVentas');

const clienteDAO = new ClienteDAO();
const notaRemisionDAO = new NotaRemisionDAO();
const notaServicioDAO = new NotaServicioDAO();
const servicioDAO = new ServicioDAO();
const quejaDAO = new QuejaDAO();
const reporteServicios = new ReporteServicios();
const reporteVentas = new ReporteVentas();

app.get('/consultaClientes', (req, res) => { //direccionamiento
    clienteDAO.getAllClientes((clientes) => {
        res.send(clientes);
    });
});
app.get('/consultaCliente/:id', (req, res) => { // direccionamiento
    const id = req.params.id; // Extraer el id de los parámetros de la URL
    clienteDAO.getClienteById(id, (cliente) => {
        res.send(cliente);
    });
});

app.post('/algo', (req, res) => { //direccionamiento
    res.send('Hola mundo ALGO POST');
});
app.delete('/algo', (req, res) => { //direccionamiento
    res.send('Hola mundo ALGO DELETE');
});
app.listen(3000, () => {    
    console.log('Servidor levantado y escuchando por el puerto 3000!');
});