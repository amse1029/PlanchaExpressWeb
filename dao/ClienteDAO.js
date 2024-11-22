const connection = require('../bd/bd_plancha_express');
const Cliente = require('../dominio/Cliente');

class ClienteDAO {
    // Obtener todos los clientes
    getAllClientes(callback) {
        connection.query('SELECT * FROM Cliente', (err, rows) => {
            if (err) throw err;

            // Convertir cada resultado en una instancia de la clase Cliente
            const clientes = rows.map(row => new Cliente(row.nombre, row.apellido, row.email, row.password));
            callback(clientes);
        });
    }

    // Obtener un cliente por su ID
    getClienteById(id, callback) {
        connection.query('SELECT * FROM Cliente WHERE id_cliente = ?', [id], (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                // Crear una instancia de Cliente con los datos obtenidos
                const cliente = new Cliente(rows[0].nombre, rows[0].apellido, rows[0].email, rows[0].password, rows[0].id_cliente);
                callback(cliente);
            } else {
                callback(null); // Si no se encuentra el cliente
            }
        });
    }

    // Agregar un nuevo cliente
    addCliente(nombre, apellido, email, password, callback) {
        connection.query('INSERT INTO Cliente (nombre, apellido, email, pass) VALUES (?, ?, ?, ?)', [nombre, apellido, email, password], (err, result) => {
            if (err) throw err;
            callback(result.insertId); // Devuelve el ID del cliente agregado
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
