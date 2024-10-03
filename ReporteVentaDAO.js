const connection = require('./bd_plancha_express');
const ReporteVenta = require('./dominio/ReporteVenta');

class ReporteVentaDAO {
    // Obtener todos los reportes de venta
    getAllReportesVenta(callback) {
        connection.query('SELECT * FROM ReporteVenta', (err, rows) => {
            if (err) throw err;

            const reportesVenta = rows.map(row => new ReporteVenta(row.fecha, row.ventaTotal));
            callback(reportesVenta);
        });
    }

    // Obtener un reporte de venta por su ID
    getReporteVentaById(id, callback) {
        connection.query('SELECT * FROM ReporteVenta WHERE id_reporte_venta = ?', [id], (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                const reporteVenta = new ReporteVenta(rows[0].fecha, rows[0].ventaTotal);
                callback(reporteVenta);
            } else {
                callback(null);
            }
        });
    }

    // Agregar un nuevo reporte de venta
    addReporteVenta(fecha, ventaTotal, callback) {
        connection.query('INSERT INTO ReporteVenta (fecha, ventaTotal) VALUES (?, ?)', [fecha, ventaTotal], (err, result) => {
            if (err) throw err;
            callback(result.insertId);
        });
    }
}

module.exports = ReporteVentaDAO;