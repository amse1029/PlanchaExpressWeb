const connection = require('./bd_plancha_express');

class ReporteServicios {
    constructor() {}

    // Método para generar reporte de servicios filtrado por fecha
    generarReporteServicios(fechaInicio, fechaFin, callback) {
        console.log(`Filtrando servicios entre: ${fechaInicio} y ${fechaFin}`);  // Depuración

        const query = `
            SELECT Servicio.descripcion, Servicio.precio, Servicio.cantidad, NotaRemision.fecha_entrega
            FROM Servicio
            JOIN NotaServicio ON Servicio.id_servicio = NotaServicio.id_servicio
            JOIN NotaRemision ON NotaRemision.id_nota = NotaServicio.id_nota
            WHERE NotaRemision.fecha_entrega BETWEEN ? AND ?;
        `;

        connection.query(query, [fechaInicio, fechaFin], (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                const fechaActual = new Date().toLocaleDateString();
                console.log('=====================');
                console.log('Reporte de Servicios');
                console.log(`Fecha: ${fechaActual}`);
                console.log('=====================');

                console.log('Descripción | Precio | Cantidad | Fecha de Entrega');
                rows.forEach(row => {
                    console.log(`${row.descripcion} | ${row.precio} | ${row.cantidad} | ${row.fecha_entrega}`);
                });
            } else {
                console.log('No se encontraron servicios en el rango de fechas seleccionado.');
            }

            callback();
        });
    }
    
    // Método para obtener el rango de fechas para reportes diarios, semanales y mensuales
    getFechasReporte(tipoReporte) {
        const hoy = new Date();
        let fechaInicio;
        switch (tipoReporte) {
            case 'diario':
                fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
                break;
            case 'semanal':
                fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 7);
                break;
            case 'mensual':
                fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
                break;
        }
        console.log(`Fecha de inicio del reporte ${tipoReporte}: ${fechaInicio.toISOString().slice(0, 10)}`);
        return [fechaInicio.toISOString().slice(0, 10), hoy.toISOString().slice(0, 10)];
    }
}

module.exports = ReporteServicios;
