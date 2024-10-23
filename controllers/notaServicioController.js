const notaServicioDAO = new (require('../dao/NotaServicioDAO'))();

exports.listarNotasServicios = (req, res) => {
    notaServicioDAO.getAllNotasServicios((notasServicios) => {
        res.json(notasServicios);
    });
};

exports.agregarNotaServicio = (req, res) => {
    const { idNota, idServicio } = req.body;
    notaServicioDAO.addNotaServicio(idNota, idServicio, (id) => {
        res.json({ message: `NotaServicio agregada con ID: ${id}` });
    });
};
