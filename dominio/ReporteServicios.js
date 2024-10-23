const Reporte = require('./Reporte'); // Asegúrate de usar la ruta correcta

class ReporteServicios extends Reporte {
    constructor(fecha, servicios) {
        super(fecha);
        this.servicios = servicios;
    }
}

module.exports = ReporteServicios;
