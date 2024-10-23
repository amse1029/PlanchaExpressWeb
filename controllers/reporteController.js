const ReporteServicios = require('../dao/ReporteServiciosDAO');
const ReporteVentas = require('../dao/ReporteVentasDAO');

const reporteServicios = new ReporteServicios(); // Instancia de ReporteServicios
const reporteVentas = new ReporteVentas(); // Instancia de ReporteVentas

// Controlador para reporte de servicios
exports.reporteServicios = (req, res) => {
    const filtroFecha = req.params.filtroFecha || 'diario'; // Obtener el filtro de fecha desde los parámetros de la ruta
    reporteServicios.generarReporte(filtroFecha, (reporte) => {
        res.send(reporte);
    });
};

// Controlador para reporte de ventas
exports.reporteVentas = (req, res) => {
    const filtroFecha = req.params.filtroFecha || 'diario'; // Obtener el filtro de fecha desde los parámetros de la ruta
    reporteVentas.generarReporte(filtroFecha, (reporte) => {
        res.send(reporte);
    });
};
