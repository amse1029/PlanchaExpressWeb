const connection = require('./bd_plancha_express');
const Servicio = require('./dominio/Servicio');

class ServicioDAO {
    // Obtener todos los servicios
    getAllServicios(callback) {
        connection.query('SELECT * FROM Servicio', (err, rows) => {
            if (err) throw err;

            // Convertir cada resultado en una instancia de la clase Servicio
            const servicios = rows.map(row => new Servicio(row.descripcion, row.precio, row.cantidad));
            callback(servicios);
        });
    }

    // Obtener un servicio por su ID
    getServicioById(id, callback) {
        connection.query('SELECT * FROM Servicio WHERE id_servicio = ?', [id], (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                // Crear una instancia de Servicio con los datos obtenidos
                const servicio = new Servicio(rows[0].descripcion, rows[0].precio, rows[0].cantidad);
                callback(servicio);
            } else {
                callback(null);  // Si no se encuentra el servicio
            }
        });
    }

    // Agregar un nuevo servicio
    addServicio(descripcion, precio, cantidad, callback) {
        connection.query('INSERT INTO Servicio (descripcion, precio, cantidad) VALUES (?, ?, ?)', [descripcion, precio, cantidad], (err, result) => {
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
    updateServicio(id, descripcion, precio, cantidad, callback) {
        connection.query('UPDATE Servicio SET descripcion = ?, precio = ?, cantidad = ? WHERE id_servicio = ?', [descripcion, precio, cantidad, id], (err) => {
            if (err) throw err;
            callback();
        });
    }
}

module.exports = ServicioDAO;
