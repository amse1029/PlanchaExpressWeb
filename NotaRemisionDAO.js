const connection = require('./bd_plancha_express');

class NotaRemisionDAO {
    // Obtener todas las notas de remisión
    getAllNotas(callback) {
        connection.query('SELECT * FROM NotaRemision', (err, rows) => {
            if (err) throw err;
            callback(rows);
        });
    }

    // Obtener una nota de remisión por su ID
    getNotaById(id, callback) {
        connection.query('SELECT * FROM NotaRemision WHERE id_nota = ?', [id], (err, rows) => {
            if (err) throw err;
            callback(rows[0]);
        });
    }

    // Agregar una nueva nota de remisión
    addNota(idCliente, fechaEntrega, total, callback) {
        connection.query('INSERT INTO NotaRemision (id_cliente, fecha_entrega, total) VALUES (?, ?, ?)', [idCliente, fechaEntrega, total], (err, result) => {
            if (err) throw err;
            callback(result.insertId);
        });
    }

    // Eliminar una nota de remisión
    deleteNota(id, callback) {
        connection.query('DELETE FROM NotaRemision WHERE id_nota = ?', [id], (err) => {
            if (err) throw err;
            callback();
        });
    }

    // Actualizar una nota de remisión
    updateNota(id, fechaEntrega, total, callback) {
        connection.query('UPDATE NotaRemision SET fecha_entrega = ?, total = ? WHERE id_nota = ?', [fechaEntrega, total, id], (err) => {
            if (err) throw err;
            callback();
        });
    }
}

module.exports = NotaRemisionDAO;
