const connection = require('./bd_plancha_express');

class ClienteDAO {
    // Obtener todos los clientes
    getAllClientes(callback) {
        connection.query('SELECT * FROM Cliente', (err, rows) => {
            if (err) throw err;
            callback(rows);
        });
    }

    // Obtener un cliente por su ID
    getClienteById(id, callback) {
        connection.query('SELECT * FROM Cliente WHERE id_cliente = ?', [id], (err, rows) => {
            if (err) throw err;
            callback(rows[0]);
        });
    }

    // Agregar un nuevo cliente
    addCliente(nombre, apellido, callback) {
        connection.query('INSERT INTO Cliente (nombre, apellido) VALUES (?, ?)', [nombre, apellido], (err, result) => {
            if (err) throw err;
            callback(result.insertId);
        });
    }

    // Eliminar un cliente
    deleteCliente(id, callback) {
        connection.query('DELETE FROM Cliente WHERE id_cliente = ?', [id], (err) => {
            if (err) throw err;
            callback();
        });
    }
}

module.exports = ClienteDAO;
