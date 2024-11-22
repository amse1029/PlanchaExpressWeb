const clienteDAO = new (require('../dao/ClienteDAO'))();

exports.listarClientes = (req, res) => {
    clienteDAO.getAllClientes((clientes) => {
        res.json(clientes);
    });
};

exports.agregarCliente = (req, res) => {
    console.log(req.body);
    const { nombre, apellido, email, password, confirmar } = req.body;

    // Validar que las contraseñas coincidan
    if (password !== confirmar) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    // Almacenar el cliente
    clienteDAO.addCliente(nombre, apellido, email, password, (id) => {
        res.json({ message: `Cliente agregado con ID: ${id}` });
    });
};