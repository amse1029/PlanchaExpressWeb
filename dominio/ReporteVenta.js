// Asegúrate de que la ruta sea correcta según tu estructura de carpetas
const Reporte = require('./Reporte'); // Si ambos archivos están en la carpeta "dominio"

class ReporteVenta extends Reporte {
    constructor(fecha, ventas) {
        super(fecha);
        this.ventas = ventas;
    }
}

module.exports = ReporteVenta;
