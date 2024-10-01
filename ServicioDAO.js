const connection = require('./bd_plancha_express');

class ServicioDAO {
    // Obtener todos los servicios
    getAllServicios(callback) {
        connection.query('SELECT * FROM Servicio', (err, rows) => {
            if (err) throw err;
            callback(rows);
        });
    }

    // Obtener un servicio por su ID
    getServicioById(id, callback) {
        connection.query('SELECT * FROM Servicio WHERE id_servicio = ?', [id], (err, rows) => {
            if (err) throw err;
            callback(rows[0]);
        });
    }

    // Agregar un nuevo servicio
    addServicio(descripcion, precio, callback) {
        connection.query('INSERT INTO Servicio (descripcion, precio) VALUES (?, ?)', [descripcion, precio], (err, result) => {
            if (err) throw err;
            callback(result.insertId);
        });
    }

    // Eliminar un servicio
    deleteServicio(id, callback) {
        connection.query('DELETE FROM Servicio WHERE id_servicio = ?', [id], (err) => {
            if (err) throw err;
            callback();
        });
    }

    // Actualizar un servicio
    updateServicio(id, descripcion, precio, callback) {
        connection.query('UPDATE Servicio SET descripcion = ?, precio = ? WHERE id_servicio = ?', [descripcion, precio, id], (err) => {
            if (err) throw err;
            callback();
        });
    }
}

module.exports = ServicioDAO;
