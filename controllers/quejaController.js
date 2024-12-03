const quejaDAO = new (require('../dao/QuejaDAO'))();

exports.listarQuejas = (req, res) => {
    quejaDAO.getAllQuejas((quejas) => {
        res.json(quejas);
    });
};

exports.agregarQueja = (req, res) => {
    const { mensaje, idCliente } = req.body;

    // Validar que los parámetros existan
    if (!mensaje || !idCliente) {
        return res.status(400).json({ error: "Faltan parámetros: mensaje e idCliente son obligatorios." });
    }

    // Validar formato de mensaje
    const mensajeRegex = /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ.,!?¿'" ]{5,500}$/;
    if (!mensajeRegex.test(mensaje)) {
        return res.status(400).json({ 
            error: "El mensaje debe contener entre 5 y 500 caracteres, y solo puede incluir letras, números y puntuación básica."
        });
    }

    // Validar que idCliente sea un número entero
    if (!Number.isInteger(Number(idCliente))) {
        return res.status(400).json({ error: "El idCliente debe ser un número entero válido." });
    }

    // Si pasa las validaciones, se procesa la queja
    quejaDAO.addQueja(mensaje, idCliente, (id) => {
        res.json({ message: `Queja agregada con ID: ${id}` });
    });
};

