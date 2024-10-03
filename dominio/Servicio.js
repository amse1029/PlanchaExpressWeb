class Servicio {
    constructor(descripcion, precio, cantidad) {
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    toJSON() {
        return {
            descripcion: this.descripcion,
            precio: this.precio,
            cantidad: this.cantidad
        };
    }
}

module.exports = Servicio;