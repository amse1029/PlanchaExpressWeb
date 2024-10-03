const connection = require('./bd_plancha_express');

class NotaServicioDAO {
    // Obtener todos los registros de nota-servicio
    getAllNotasServicios(callback) {
        connection.query('SELECT * FROM NotaServicio', (err, rows) => {
            if (err) throw err;
            callback(rows);

        });
    }

    // Obtener un registro de nota-servicio por su ID
    getNotaServicioById(id, callback) {
        connection.query('SELECT * FROM NotaServicio WHERE id_nota_servicio = ?', [id], (err, rows) => {
            if (err) throw err;
            callback(rows[0]);

        });
    }

    // Agregar un nuevo registro de nota-servicio
    addNotaServicio(idNota, idServicio, callback) {
        connection.query('INSERT INTO NotaServicio (id_nota, id_servicio) VALUES (?, ?)', [idNota, idServicio], (err, result) => {
            if (err) throw err;
            callback(result.insertId);

        });
    }

    // Eliminar un registro de nota-servicio
    deleteNotaServicio(id, callback) {
        connection.query('DELETE FROM NotaServicio WHERE id_nota_servicio = ?', [id], (err) => {
            if (err) throw err;
            callback();

        });
    }

    // Actualizar un registro de nota-servicio
    updateNotaServicio(id, idNota, idServicio, cantidad, callback) {
        connection.query('UPDATE NotaServicio SET id_nota = ?, id_servicio = ?, cantidad = ? WHERE id_nota_servicio = ?', [idNota, idServicio, cantidad, id], (err) => {
            if (err) throw err;
            callback();

        });
    }
}

module.exports = NotaServicioDAO;
