const clienteDAO = new (require('../dao/ClienteDAO'))();

exports.listarClientes = (req, res) => {
    clienteDAO.getAllClientes((clientes) => {
        res.json(clientes);
    });
};

exports.agregarCliente = (req, res) => {
    console.log(req.body);
    const { nombre, apellido, email, password, confirm_password } = req.body;

    console.log(nombre);
    console.log(apellido);
    console.log(email);
    console.log(password);
    // Validar que las contraseñas coincidan
    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    // Almacenar el cliente
    clienteDAO.addCliente(nombre, apellido, email, password, (id) => {
        res.json({ message: `Cliente agregado con ID: ${id}` });
    });
};