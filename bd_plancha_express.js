const mysql = require('mysql2');
const readlineSync = require('readline-sync');

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'AlexaSoto1',  // Cambia esto por tu contraseña
  database: 'plancha_express_web'  // Cambia esto por el nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
  console.log('Conectado a la base de datos MySQL');
  menu();  // Llamar al menú después de la conexión
});

// Función para mostrar el menú
function menu() {
  console.log('\n=== MENÚ CRUD ===');
  console.log('1. Crear Servicio');
  console.log('2. Leer Servicios');
  console.log('3. Actualizar Servicio');
  console.log('4. Eliminar Servicio');
  console.log('5. Salir');
  
  const option = readlineSync.question('Elige una opción: ');
  
  switch (option) {
    case '1':
      crearServicio();
      break;
    case '2':
      leerServicios();
      break;
    case '3':
      actualizarServicio();
      break;
    case '4':
      eliminarServicio();
      break;
    case '5':
      salir();
      break;
    default:
      console.log('Opción no válida');
      menu();
  }
}

// Función para crear un servicio
function crearServicio() {
  const descripcion = readlineSync.question('Descripción del servicio: ');
  const precio = readlineSync.questionFloat('Precio del servicio: ');

  const query = 'INSERT INTO Servicio (descripcion, precio) VALUES (?, ?)';
  connection.query(query, [descripcion, precio], (err, results) => {
    if (err) {
      console.error('Error al crear el servicio:', err);
    } else {
      console.log('Servicio creado con éxito');
    }
    menu();
  });
}

// Función para leer todos los servicios
function leerServicios() {
  const query = 'SELECT * FROM Servicio';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los servicios:', err);
    } else {
      console.log('\n=== LISTA DE SERVICIOS ===');
      results.forEach((servicio) => {
        console.log(`ID: ${servicio.id}, Descripción: ${servicio.descripcion}, Precio: ${servicio.precio}`);
      });
    }
    menu();
  });
}

// Función para actualizar un servicio
function actualizarServicio() {
  const id = readlineSync.questionInt('ID del servicio a actualizar: ');
  const descripcion = readlineSync.question('Nueva descripción: ');
  const precio = readlineSync.questionFloat('Nuevo precio: ');

  const query = 'UPDATE Servicio SET descripcion = ?, precio = ? WHERE id = ?';
  connection.query(query, [descripcion, precio, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el servicio:', err);
    } else {
      console.log('Servicio actualizado con éxito');
    }
    menu();
  });
}

// Función para eliminar un servicio
function eliminarServicio() {
  const id = readlineSync.questionInt('ID del servicio a eliminar: ');
  
  const query = 'DELETE FROM Servicio WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al eliminar el servicio:', err);
    } else {
      console.log('Servicio eliminado con éxito');
    }
    menu();
  });
}

// Función para salir del programa
function salir() {
  console.log('Saliendo...');
  connection.end();
}
