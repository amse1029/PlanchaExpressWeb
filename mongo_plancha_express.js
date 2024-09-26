const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test')

mongoose.connection.on('open', _ => {
  console.log("Se ha conectado");
})

// Esquema del Cliente
const clienteSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  quejas: [String]
});

// Modelo del Cliente
const Cliente = mongoose.model('Cliente', clienteSchema);

async function crearCliente(nombre, apellido, quejas) {
  const cliente = new Cliente({ nombre, apellido, quejas });
  const resultado = await cliente.save();
  console.log('Cliente creado:', resultado);
}

// Función para leer todos los clientes (Read)
async function obtenerClientes() {
  const clientes = await Cliente.find();
  console.log('Clientes:', clientes);
}

// Función para actualizar un cliente (Update)
async function actualizarCliente(id, datosActualizados) {
  const resultado = await Cliente.findByIdAndUpdate(id, datosActualizados, { new: true });
  console.log('Cliente actualizado:', resultado);
}

// Función para eliminar un cliente (Delete)
async function eliminarCliente(id) {
  const resultado = await Cliente.findByIdAndDelete(id);
  console.log('Cliente eliminado:', resultado);
}

// Ejemplos de uso:
// Crear un cliente
//crearCliente('Alexa', 'Soto', ['Mi ropa estaba arrugada', 'Mi ropa apestaba']);

// Obtener todos los clientes
obtenerClientes();

// Actualizar un cliente (cambia el id por uno real de tu base de datos)
actualizarCliente('1', { nombre: 'Actualizado', apellido: 'Apellido Actualizado' });

// Eliminar un cliente (cambia el id por uno real de tu base de datos)
// eliminarCliente('id_cliente_aqui');
