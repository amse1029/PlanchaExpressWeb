const Usuario = require("./Usuario");

class Administrador extends Usuario {
    constructor(email, pass, usuario, id) {
        super(email, pass, id);
        this.usuario = usuario;
    }
}

module.exports = Administrador;