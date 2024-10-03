const connection = require('./bd_plancha_express');
const ReporteServicios = require('./dominio/ReporteServicios');
const Servicio = require('./dominio/Servicio');

class ReporteServiciosDAO {
    // Obtener todos los reportes de servicios
    getAllReportesServicios(callback) {
        connection.query('SELECT * FROM ReporteServicios', (err, rows) => {
            if (err) throw err;

            const reportesServicios = rows.map(row => {
                const servicios = JSON.parse(row.servicios).map(servicio => new Servicio(servicio.descripcion, servicio.precio, servicio.cantidad));
                return new ReporteServicios(row.fecha, servicios);
            });
            callback(reportesServicios);
        });
    }

    // Obtener un reporte de servicios por su ID
    getReporteServiciosById(id, callback) {
        connection.query('SELECT * FROM ReporteServicios WHERE id_reporte_servicios = ?', [id], (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                const servicios = JSON.parse(rows[0].servicios).map(servicio => new Servicio(servicio.descripcion, servicio.precio, servicio.cantidad));
                const reporteServicios = new ReporteServicios(rows[0].fecha, servicios);
                callback(reporteServicios);
            } else {
                callback(null);
            }
        });
    }

    // Agregar un nuevo reporte de servicios
    addReporteServicios(fecha, servicios, callback) {
        const serviciosJson = JSON.stringify(servicios); // Convertir el arreglo de servicios a JSON
        connection.query('INSERT INTO ReporteServicios (fecha, servicios) VALUES (?, ?)', [fecha, serviciosJson], (err, result) => {
            if (err) throw err;
            callback(result.insertId);
        });
    }
}

module.exports = ReporteServiciosDAO;
