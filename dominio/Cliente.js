class Cliente {
    constructor(nombre, apellido, quejas = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.quejas = quejas;  // Relación con Queja (1 a muchos)
    }
}
