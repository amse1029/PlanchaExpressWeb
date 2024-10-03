const connection = require('./bd_plancha_express');
const Queja = require('./dominio/Queja');

class QuejaDAO {
    // Obtener todas las quejas
    getAllQuejas(callback) {
        connection.query('SELECT * FROM Queja', (err, rows) => {
            if (err) throw err;

            // Convertir cada resultado en una instancia de la clase Queja
            const quejas = rows.map(row => new Queja(row.mensaje));
            callback(quejas);
        });
    }

    // Obtener quejas por ID de cliente
    getQuejasByClienteId(id_cliente, callback) {
        connection.query('SELECT * FROM Queja WHERE id_cliente = ?', [id_cliente], (err, rows) => {
            if (err) throw err;

            // Convertir cada resultado en una instancia de la clase Queja
            const quejas = rows.map(row => new Queja(row.mensaje));
            callback(quejas);
        });
    }

    // Agregar una nueva queja
    addQueja(mensaje, id_cliente, callback) {
        connection.query('INSERT INTO Queja (mensaje, id_cliente) VALUES (?, ?)', [mensaje, id_cliente], (err, result) => {
            if (err) throw err;
            callback(result.insertId);
        });
    }

    // Eliminar una queja
    deleteQueja(id_queja, callback) {
        connection.query('DELETE FROM Queja WHERE id_queja = ?', [id_queja], (err) => {
            if (err) throw err;
            callback();
        });
    }
}

module.exports = QuejaDAO;
