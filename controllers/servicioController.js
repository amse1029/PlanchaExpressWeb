const servicioDAO = new (require('../dao/ServicioDAO'))();

exports.listarServicios = (req, res) => {
    servicioDAO.getAllServicios((servicios) => {
        res.json(servicios);
    });
};

exports.agregarServicio = (req, res) => {
    const { descripcion, precio, cantidad } = req.body;
    servicioDAO.addServicio(descripcion, precio, cantidad, (id) => {
        res.json({ message: `Servicio agregado con ID: ${id}` });
    });
};
