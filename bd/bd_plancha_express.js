const mysql = require('mysql2');

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',  // Cambia esto por tu contraseña
  database: 'plancha_express_web'  // Cambia esto por el nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);  // Termina el proceso si hay error
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;
