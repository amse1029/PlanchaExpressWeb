const connection = require('../bd/bd_plancha_express');
const Servicio = require('../dominio/Servicio');

class ServicioDAO {
    // Obtener todos los servicios con sus cantidades totales
    getAllServicios(callback) {
        const query = `
            SELECT s.id_servicio, s.descripcion, s.precio, 
                   IFNULL(SUM(ns.cantidad), 0) AS cantidad_total
            FROM Servicio s
            LEFT JOIN NotaServicio ns ON s.id_servicio = ns.id_servicio
            GROUP BY s.id_servicio;
        `;

        connection.query(query, (err, rows) => {
            if (err) throw err;

            // Convertir cada resultado en una instancia de la clase Servicio
            const servicios = rows.map(row => new Servicio(row.descripcion, row.precio, row.cantidad_total));
            callback(servicios);
        });
    }

    // Obtener un servicio por su ID, incluyendo la cantidad total
    getServicioById(id, callback) {
        const query = `
            SELECT s.id_servicio, s.descripcion, s.precio, 
                   IFNULL(SUM(ns.cantidad), 0) AS cantidad_total
            FROM Servicio s
            LEFT JOIN NotaServicio ns ON s.id_servicio = ns.id_servicio
            WHERE s.id_servicio = ?
            GROUP BY s.id_servicio;
        `;

        connection.query(query, [id], (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                // Crear una instancia de Servicio con los datos obtenidos
                const servicio = new Servicio(rows[0].descripcion, rows[0].precio, rows[0].cantidad_total);
                callback(servicio);
            } else {
                callback(null); // Si no se encuentra el servicio
            }
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
