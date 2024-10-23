const notaRemisionDAO = new (require('../dao/NotaRemisionDAO'))();

exports.listarNotas = (req, res) => {
    notaRemisionDAO.getAllNotas((notas) => {
        res.json(notas);
    });
};

exports.agregarNota = (req, res) => {
    const { idCliente, fechaEntrega, total } = req.body;
    notaRemisionDAO.addNota(idCliente, fechaEntrega, total, (id) => {
        res.json({ message: `Nota de remisión agregada con ID: ${id}` });
    });
};
