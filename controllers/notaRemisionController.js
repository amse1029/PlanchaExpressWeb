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

// Método para consultar una nota de remisión por folio
exports.consultarNota = (req, res) => {
    const { folio } = req.params;  // Obtener el folio de los parámetros de la ruta

    // Validar que el folio esté presente
    if (!folio) {
        return res.status(400).json({ message: "Folio es requerido" });
    }

    // Buscar la nota de remisión por folio
    notaRemisionDAO.getNotaById(folio, (nota) => {
        if (nota) {
            res.json({
                folio: folio,
                cliente: nota.cliente,
                fecha_entrega: nota.fecha_entrega,
                total: nota.total,
                estado: nota.estado,
                servicios: nota.servicios
            });
        } else {
            res.status(404).json({ message: 'Nota de remisión no encontrada' });
        }
    });
};
