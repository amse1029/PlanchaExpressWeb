const mongoose = require('mongoose');
const readline = require('readline');

// Configuración de readline para interactuar en la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1/PlanchaExpressMongo');

mongoose.connection.on('open', _ => {
  console.log("Se ha conectado a MongoDB");
  mostrarMenu();
});

// Esquema del Cliente
const clienteSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  quejas: [String]
});

// Modelo del Cliente
const Cliente = mongoose.model('Cliente', clienteSchema);

// Función para crear un cliente (Create)
async function crearCliente(nombre, apellido, quejas) {
  try {
    const cliente = new Cliente({ nombre, apellido, quejas });
    const resultado = await cliente.save();
    console.log('Cliente creado:', resultado);
  } catch (error) {
    console.error('Error al crear el cliente:', error.message);
  }
}

// Función para leer todos los clientes (Read)
async function obtenerClientes() {
  try {
    const clientes = await Cliente.find();
    console.log('Clientes:', clientes);
  } catch (error) {
    console.error('Error al obtener los clientes:', error.message);
  }
}

// Función para actualizar un cliente (Update)
async function actualizarCliente(id, datosActualizados) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('El id proporcionado no es un ObjectId válido');
    }

    const resultado = await Cliente.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!resultado) {
      throw new Error('Cliente no encontrado');
    }
    console.log('Cliente actualizado:', resultado);
  } catch (error) {
    console.error('Error al actualizar el cliente:', error.message);
  }
}

// Función para agregar una nueva queja a un cliente
async function agregarQueja(id, nuevaQueja) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('El id proporcionado no es un ObjectId válido');
    }

    // Buscamos el cliente y agregamos la nueva queja
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }
    
    cliente.quejas.push(nuevaQueja); // Agregar la nueva queja al array existente
    await cliente.save(); // Guardar los cambios

    console.log('Queja agregada:', cliente);
  } catch (error) {
    console.error('Error al agregar la queja:', error.message);
  }
}

// Función para eliminar un cliente (Delete)
async function eliminarCliente(id) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('El id proporcionado no es un ObjectId válido');
    }

    const resultado = await Cliente.findByIdAndDelete(id);
    if (!resultado) {
      throw new Error('Cliente no encontrado');
    }
    console.log('Cliente eliminado:', resultado);
  } catch (error) {
    console.error('Error al eliminar el cliente:', error.message);
  }
}

// Función para mostrar el menú
function mostrarMenu() {
  console.log(`
    --- Menú ---
    1. Crear Cliente
    2. Mostrar Clientes
    3. Actualizar Cliente
    4. Eliminar Cliente
    5. Registrar Nueva Queja
    0. Salir
  `);
  rl.question('Selecciona una opción: ', (opcion) => {
    switch (opcion) {
      case '1':
        rl.question('Nombre: ', (nombre) => {
          rl.question('Apellido: ', (apellido) => {
            rl.question('Quejas (separadas por comas): ', (quejas) => {
              crearCliente(nombre, apellido, quejas.split(',')).then(() => {
                mostrarMenu(); // Ahora el menú se muestra después de crear el cliente
              });
            });
          });
        });
        break;
      case '2':
        obtenerClientes().then(() => mostrarMenu());
        break;
      case '3':
        rl.question('ID del cliente a actualizar: ', (id) => {
          rl.question('Nuevo nombre: ', (nombre) => {
            rl.question('Nuevo apellido: ', (apellido) => {
              actualizarCliente(id, { nombre, apellido }).then(() => mostrarMenu());
            });
          });
        });
        break;
      case '4':
        rl.question('ID del cliente a eliminar: ', (id) => {
          eliminarCliente(id).then(() => mostrarMenu());
        });
        break;
      case '5':
        rl.question('ID del cliente al que quieres agregar una queja: ', (id) => {
          rl.question('Escribe la nueva queja: ', (nuevaQueja) => {
            agregarQueja(id, nuevaQueja).then(() => mostrarMenu());
          });
        });
        break;
      case '0':
        cerrarConexion();
        break;
      default:
        console.log('Opción no válida');
        mostrarMenu();
        break;
    }
  });
}

// Función para cerrar la conexión y salir del programa
async function cerrarConexion() {
  try {
    await mongoose.connection.close(); // Cerrar la conexión sin callback
    console.log('Conexión a MongoDB cerrada. Programa finalizado.');
    rl.close(); // Finalizar la interfaz de readline
    process.exit(0); // Cerrar el proceso
  } catch (error) {
    console.error('Error al cerrar la conexión:', error.message);
  }
}

// Evento cuando se cierra la interfaz readline
rl.on('close', () => {
  console.log('Saliendo del programa...');
});
