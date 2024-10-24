const UsuarioDAO = new (require('../dao/UsuarioDAO'))();

exports.getAllUsuarios = (req, res) => {
    UsuarioDAO.getAllUsuarios((usuarios) => {
        res.json(usuarios);
    });
};

exports.addUsuario = (req, res) => {
    const { usuario, pass } = req.body;
    UsuarioDAO.addUsuario(usuario, pass, (id) => {
        res.json({ message: `Usuario agregado con ID: ${id}` });
    });
};