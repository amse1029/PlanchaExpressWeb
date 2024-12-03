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
    const { folio, idCliente } = req.body;

    // Validar que los parámetros estén presentes
    if (!folio || !idCliente) {
        return res.status(400).json({ message: "Faltan parámetros." });
    }

    // Validar que 'folio' sea un número entero
    if (!/^\d+$/.test(folio)) {
        return res.status(400).json({ message: "El folio debe ser un número entero." });
    }

    // Convertir 'folio' a número entero por seguridad
    const folioInt = parseInt(folio, 10);

    // Continuar con la búsqueda de la nota
    notaRemisionDAO.getNotaByFolioAndCliente(folioInt, idCliente, (nota, error) => {
        if (error) {
            return res.status(500).json({ message: error });
        }

        if (!nota) {
            return res.status(404).json({ message: "Nota no encontrada para este cliente." });
        }

        // Respuesta con los detalles de la nota
        res.json({
            folio: folioInt,
            cliente: nota.cliente,
            fecha_entrega: nota.fecha_entrega,
            total: nota.total,
            estado: nota.estado,
            servicios: nota.servicios
        });
    });
};

