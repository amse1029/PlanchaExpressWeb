const clienteDAO = new (require('../dao/ClienteDAO'))();

exports.listarClientes = (req, res) => {
    clienteDAO.getAllClientes((clientes) => {
        res.json(clientes);
    });
};

exports.agregarCliente = (req, res) => {
    const { nombre, apellido } = req.body;
    clienteDAO.addCliente(nombre, apellido, (id) => {
        res.json({ message: `Cliente agregado con ID: ${id}` });
    });
};