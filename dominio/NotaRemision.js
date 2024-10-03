class NotaRemision {
    constructor(cliente, servicios, fecha_entrega, total) {
        this.cliente = cliente;
        this.servicios = servicios;
        this.fecha_entrega = fecha_entrega;
        this.total = total;
    }
}

module.exports = NotaRemision;
