const connection = require('../bd/bd_plancha_express');

class ReporteServiciosDAO {
    generarReporte(filtroFecha, callback) {
        let query = `
            SELECT Servicio.descripcion, SUM(NotaServicio.cantidad) AS cantidad_total, Servicio.precio
            FROM Servicio
            JOIN NotaServicio ON Servicio.id_servicio = NotaServicio.id_servicio
            JOIN NotaRemision ON NotaServicio.id_nota = NotaRemision.id_nota
            WHERE NotaRemision.fecha_entrega BETWEEN ? AND ?
            GROUP BY Servicio.descripcion, Servicio.precio
        `;
        const { fechaInicio, fechaFin } = this.obtenerFechas(filtroFecha);

        connection.query(query, [fechaInicio, fechaFin], (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                const servicios = rows.map(row => ({
                    descripcion: row.descripcion,
                    precio: row.precio,
                    cantidadTotal: row.cantidad_total
                }));

                // Calcular estadísticas
                const estadisticas = this.calcularEstadisticas(servicios);

                // Crear el reporte en formato de tabla
                const reporte = `
Reporte de Servicios (${filtroFecha})
Fecha: ${new Date().toLocaleDateString()}
----------------------------------------
| Descripción         | Precio | Cantidad Total |
----------------------------------------
${servicios.map(s => `| ${s.descripcion.padEnd(20)} | ${s.precio.toFixed(2).padEnd(6)} | ${s.cantidadTotal.toString().padEnd(14)} |`).join('\n')}
----------------------------------------
Estadísticas
----------------------------------------
Total Servicios Realizados: ${estadisticas.totalServicios}
Servicio más solicitado: ${estadisticas.servicioMasSolicitado.descripcion} (${estadisticas.servicioMasSolicitado.cantidadTotal} veces)
Media: ${estadisticas.media.toFixed(2)}, Moda: ${estadisticas.moda}, Mediana: ${estadisticas.mediana}
                `;
                callback(reporte);
            } else {
                callback('No se encontraron servicios para el rango de fechas seleccionado.');
            }
        });
    }

    calcularEstadisticas(servicios) {
        const totalServicios = servicios.reduce((sum, s) => sum + s.cantidadTotal, 0);
        const servicioMasSolicitado = this.obtenerMasSolicitado(servicios);
        const media = this.calcularMedia(servicios.map(s => s.cantidadTotal));
        const moda = this.calcularModa(servicios.map(s => s.cantidadTotal));
        const mediana = this.calcularMediana(servicios.map(s => s.cantidadTotal));

        return {
            totalServicios,
            servicioMasSolicitado,
            media,
            moda,
            mediana
        };
    }

    obtenerFechas(filtroFecha) {
        const hoy = new Date();
        let fechaInicio, fechaFin;

        switch (filtroFecha) {
            case 'diario':
                fechaInicio = new Date(hoy.setHours(0, 0, 0, 0));
                fechaFin = new Date(hoy.setHours(23, 59, 59, 999));
                break;
            case 'semanal':
                fechaInicio = new Date(hoy.setDate(hoy.getDate() - hoy.getDay()));
                fechaFin = new Date();
                break;
            case 'mensual':
                fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
                fechaFin = new Date();
                break;
        }
        return { fechaInicio, fechaFin };
    }

    obtenerMasSolicitado(servicios) {
        const conteo = servicios.reduce((acc, s) => {
            acc[s.descripcion] = (acc[s.descripcion] || 0) + s.cantidadTotal;
            return acc;
        }, {});

        const descripcionMasSolicitada = Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b);
        return { descripcion: descripcionMasSolicitada, cantidadTotal: conteo[descripcionMasSolicitada] };
    }

    calcularMedia(arr) {
        const total = arr.reduce((acc, num) => acc + num, 0);
        return total / arr.length;
    }

    calcularModa(arr) {
        const frecuencia = {};
        arr.forEach(num => frecuencia[num] = (frecuencia[num] || 0) + 1);
        const moda = Object.keys(frecuencia).reduce((a, b) => frecuencia[a] > frecuencia[b] ? a : b);
        return moda;
    }

    calcularMediana(arr) {
        arr.sort((a, b) => a - b);
        const mitad = Math.floor(arr.length / 2);
        return arr.length % 2 === 0 ? (arr[mitad - 1] + arr[mitad]) / 2 : arr[mitad];
    }

    cerrarConexion() {
        connection.end((err) => {
            if (err) throw err;
            console.log('Conexión cerrada');
        });
    }
}

module.exports = ReporteServiciosDAO;
