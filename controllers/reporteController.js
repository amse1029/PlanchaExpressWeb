const ReporteServicios = require('../dao/ReporteServiciosDAO');
const ReporteVentas = require('../dao/ReporteVentasDAO');

const reporteServicios = new ReporteServicios(); // Instancia de ReporteServicios
const reporteVentas = new ReporteVentas(); // Instancia de ReporteVentas

exports.reporteServicios = (req, res) => {
    const filtroFecha = req.params.filtroFecha || 'diario';
    reporteServicios.generarReporte(filtroFecha, (err, reporte) => {
        if (err) {
            console.error('Error al generar el reporte:', err);
            return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
        res.json(reporte);
    });
};

exports.reporteVentas = (req, res) => {
    const filtroFecha = req.params.filtroFecha || 'diario'; // Obtener el filtro de fecha desde los parámetros de la ruta
    reporteVentas.generarReporte(filtroFecha, (err, reporte) => {
        if (err) {
            console.error('Error al generar el reporte:', err);
            return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }

        res.json(reporte); // Enviar el reporte como JSON
    });
};

