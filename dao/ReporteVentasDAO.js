const connection = require('../bd/bd_plancha_express');

class ReporteVentasDAO {
    generarReporte(filtroFecha, callback) {
        let query = `
            SELECT NotaRemision.id_nota, NotaRemision.fecha_entrega, NotaRemision.total
            FROM NotaRemision
            WHERE NotaRemision.fecha_entrega BETWEEN ? AND ?
        `;
        const { fechaInicio, fechaFin } = this.obtenerFechas(filtroFecha);
    
        connection.query(query, [fechaInicio, fechaFin], (err, rows) => {
            if (err) throw err;
    
            if (rows.length > 0) {
                const ventas = rows.map(row => ({
                    idNota: row.id_nota,
                    fecha: row.fecha_entrega,
                    total: row.total
                }));
    
                // Calcular estadísticas
                const estadisticas = this.calcularEstadisticas(ventas);
    
                // Enviar un objeto JSON con los datos y estadísticas
                const reporte = {
                    filtro: filtroFecha,
                    fechaGeneracion: new Date().toLocaleDateString(),
                    ventas,
                    estadisticas
                };
                callback(null, reporte);
            } else {
                callback(null, { mensaje: 'No se encontraron ventas para el rango de fechas seleccionado.' });
            }
        });
    }    

    calcularEstadisticas(ventas) {
        const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0);
        const notaMasCara = this.obtenerNotaMasCara(ventas);
        const media = this.calcularMedia(ventas.map(v => v.total));
        const moda = this.calcularModa(ventas.map(v => v.total));
        const mediana = this.calcularMediana(ventas.map(v => v.total));

        return {
            totalVentas,
            notaMasCara,
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

    obtenerNotaMasCara(ventas) {
        return ventas.reduce((a, b) => (a.total > b.total) ? a : b);
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

module.exports = ReporteVentasDAO;
