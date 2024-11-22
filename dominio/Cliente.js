const Usuario = require("./Usuario");

class Cliente extends Usuario {
    constructor(nombre, apellido, email, pass, id) {
        super(email, pass, id);
        this.nombre = nombre;
        this.apellido = apellido;
    }
}

module.exports = Cliente;
