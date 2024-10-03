const Reporte = require('./Reporte');

class ReporteServicios extends Reporte {
    constructor(fecha, servicios) {
        super(fecha);
        this.servicios = servicios;
    }
}

module.exports = ReporteServicios;