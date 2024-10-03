const connection = require('./bd_plancha_express');

class ReporteServicios {
    generarReporte(filtroFecha, callback) {
        let query = `
            SELECT Servicio.descripcion, Servicio.precio, Servicio.cantidad 
            FROM Servicio
            JOIN NotaServicio ON Servicio.id_servicio = NotaServicio.id_servicio
            JOIN NotaRemision ON NotaServicio.id_nota = NotaRemision.id_nota
            WHERE NotaRemision.fecha_entrega BETWEEN ? AND ?
        `;
        const { fechaInicio, fechaFin } = this.obtenerFechas(filtroFecha);

        connection.query(query, [fechaInicio, fechaFin], (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                // Calcular medidas estadísticas
                const servicios = rows.map(row => ({
                    descripcion: row.descripcion,
                    precio: row.precio,
                    cantidad: row.cantidad
                }));

                const totalServicios = servicios.reduce((sum, s) => sum + s.cantidad, 0);
                const masSolicitado = this.obtenerMasSolicitado(servicios);
                const media = this.calcularMedia(servicios.map(s => s.cantidad));
                const moda = this.calcularModa(servicios.map(s => s.cantidad));
                const mediana = this.calcularMediana(servicios.map(s => s.cantidad));

                const reporte = `
Reporte de Servicios (${filtroFecha})
Fecha: ${new Date().toLocaleDateString()}
----------------------------------------
| Descripción         | Precio | Cantidad |
----------------------------------------
${servicios.map(s => `| ${s.descripcion.padEnd(20)} | ${s.precio.toFixed(2).padEnd(6)} | ${s.cantidad.toString().padEnd(8)} |`).join('\n')}
----------------------------------------
Total Servicios: ${totalServicios}
Servicio más solicitado: ${masSolicitado.descripcion} (${masSolicitado.cantidad} veces)
Media: ${media.toFixed(2)}, Moda: ${moda}, Mediana: ${mediana}
                `;
                callback(reporte);
            } else {
                callback('No se encontraron servicios para el rango de fechas seleccionado.');
            }

        });
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
            acc[s.descripcion] = (acc[s.descripcion] || 0) + s.cantidad;
            return acc;
        }, {});

        const descripcionMasSolicitada = Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b);
        return { descripcion: descripcionMasSolicitada, cantidad: conteo[descripcionMasSolicitada] };
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
}

module.exports = ReporteServicios;
