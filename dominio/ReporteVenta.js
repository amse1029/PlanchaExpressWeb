class ReporteVenta extends Reporte {
    constructor(fecha, ventaTotal) {
        super(fecha);
        this.ventaTotal = ventaTotal;
    }
}

module.exports = ReporteVenta;