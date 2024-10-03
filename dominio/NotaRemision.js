class NotaRemision {
    constructor(cliente, servicios, fecha_entrega, total) {
        this.cliente = cliente;  // Relación con Cliente
        this.servicios = servicios;  // Relación con Servicio (1 a muchos)
        this.fecha_entrega = fecha_entrega;
        this.total = total;
    }
}
