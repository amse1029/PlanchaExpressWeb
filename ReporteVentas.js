const connection = require('./bd_plancha_express');

class ReporteVentas {
    constructor() {}

    // Método para generar reporte de ventas filtrado por fecha
    generarReporteVentas(fechaInicio, fechaFin, callback) {
        console.log(`Filtrando ventas entre: ${fechaInicio} y ${fechaFin}`);  // Depuración

        const query = `
            SELECT NotaRemision.id_nota, NotaRemision.total, NotaRemision.fecha_entrega
            FROM NotaRemision
            WHERE NotaRemision.fecha_entrega BETWEEN ? AND ?;
        `;

        connection.query(query, [fechaInicio, fechaFin], (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                const fechaActual = new Date().toLocaleDateString();
                let totalVentas = 0;

                console.log('=====================');
                console.log('Reporte de Ventas');
                console.log(`Fecha: ${fechaActual}`);
                console.log('=====================');

                console.log('ID Nota | Fecha de Entrega | Total');
                rows.forEach(row => {
                    console.log(`${row.id_nota} | ${row.fecha_entrega} | ${row.total}`);
                    totalVentas += row.total;
                });

                console.log('---------------------');
                console.log(`Total de Ventas: ${totalVentas}`);
            } else {
                console.log('No se encontraron ventas en el rango de fechas seleccionado.');
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

module.exports = ReporteVentas;
