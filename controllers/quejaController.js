const quejaDAO = new (require('../dao/QuejaDAO'))();

exports.listarQuejas = (req, res) => {
    quejaDAO.getAllQuejas((quejas) => {
        res.json(quejas);
    });
};

exports.agregarQueja = (req, res) => {
    const { mensaje, idCliente } = req.body;
    quejaDAO.addQueja(mensaje, idCliente, (id) => {
        res.json({ message: `Queja agregada con ID: ${id}` });
    });
};
