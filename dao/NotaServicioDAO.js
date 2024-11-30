const connection = require('../bd/bd_plancha_express');

class NotaServicioDAO {
    // Obtener todos los registros de nota-servicio
    getAllNotasServicios(callback) {
        connection.query(
            `SELECT ns.id_nota_servicio, ns.id_nota, ns.id_servicio, ns.cantidad, 
                    s.descripcion AS servicio_descripcion, s.precio AS servicio_precio
             FROM NotaServicio ns
             JOIN Servicio s ON ns.id_servicio = s.id_servicio`,
            (err, rows) => {
                if (err) throw err;
                callback(rows);
            }
        );
    }

    // Obtener un registro de nota-servicio por su ID
    getNotaServicioById(id, callback) {
        connection.query(
            `SELECT ns.id_nota_servicio, ns.id_nota, ns.id_servicio, ns.cantidad, 
                    s.descripcion AS servicio_descripcion, s.precio AS servicio_precio
             FROM NotaServicio ns
             JOIN Servicio s ON ns.id_servicio = s.id_servicio
             WHERE ns.id_nota_servicio = ?`,
            [id],
            (err, rows) => {
                if (err) throw err;
                callback(rows[0]);
            }
        );
    }

    // Agregar un nuevo registro de nota-servicio
    addNotaServicio(idNota, idServicio, cantidad, callback) {
        connection.query(
            'INSERT INTO NotaServicio (id_nota, id_servicio, cantidad) VALUES (?, ?, ?)',
            [idNota, idServicio, cantidad],
            (err, result) => {
                if (err) throw err;
                callback(result.insertId);
            }
        );
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
        connection.query(
            'UPDATE NotaServicio SET id_nota = ?, id_servicio = ?, cantidad = ? WHERE id_nota_servicio = ?',
            [idNota, idServicio, cantidad, id],
            (err) => {
                if (err) throw err;
                callback();
            }
        );
    }

    // Obtener todos los servicios asociados a una nota específica
    getServiciosByNota(idNota, callback) {
        connection.query(
            `SELECT ns.id_nota_servicio, ns.cantidad, 
                    s.id_servicio, s.descripcion, s.precio 
             FROM NotaServicio ns
             JOIN Servicio s ON ns.id_servicio = s.id_servicio
             WHERE ns.id_nota = ?`,
            [idNota],
            (err, rows) => {
                if (err) throw err;
                callback(rows);
            }
        );
    }
}

module.exports = NotaServicioDAO;
