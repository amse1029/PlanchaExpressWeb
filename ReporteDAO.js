const connection = require('./bd_plancha_express');
const Reporte = require('./dominio/Reporte');

class ReporteDAO {
    // Obtener todos los reportes
    getAllReportes(callback) {
        connection.query('SELECT * FROM Reporte', (err, rows) => {
            if (err) throw err;

            const reportes = rows.map(row => new Reporte(row.fecha));
            callback(reportes);
        });
    }

    // Obtener un reporte por su ID
    getReporteById(id, callback) {
        connection.query('SELECT * FROM Reporte WHERE id_reporte = ?', [id], (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                const reporte = new Reporte(rows[0].fecha);
                callback(reporte);
            } else {
                callback(null);
            }
        });
    }

    // Agregar un nuevo reporte
    addReporte(fecha, callback) {
        connection.query('INSERT INTO Reporte (fecha) VALUES (?)', [fecha], (err, result) => {
            if (err) throw err;
            callback(result.insertId);
        });
    }
}

module.exports = ReporteDAO;