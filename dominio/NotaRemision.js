class NotaRemision {
    constructor(cliente, servicios, fecha_entrega, total, estado) {
        this.cliente = cliente;
        this.servicios = servicios;
        this.fecha_entrega = fecha_entrega;
        this.total = total;
        this.estado=estado;
    }
}

module.exports = NotaRemision;
