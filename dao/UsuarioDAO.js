const connection = require('../bd/bd_plancha_express');
const Usuario = require('../dominio/Usuario');
const Cliente = require('../dominio/Cliente');
const Administrador = require('../dominio/Administrador');

class UsuarioDAO {

    getClienteByEmail(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Cliente WHERE email = ?', [email], (err, rows) => {
                if (err) return reject(err);
    
                if (rows.length > 0) {
                    // Crear una instancia de Usuario con los datos obtenidos
                    const cliente = new Cliente(rows[0].nombre, rows[0].apellido, rows[0].email, rows[0].pass, rows[0].id_cliente);
                    resolve(cliente);
                } else {
                    resolve(null); // Si no se encuentra el usuario
                }
            });
        });
    }

    getAdminByEmail(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Administrador WHERE email = ?', [email], (err, rows) => {
                if (err) return reject(err);
    
                if (rows.length > 0) {
                    // Crear una instancia de Usuario con los datos obtenidos
                    const administrador = new Administrador(rows[0].email, rows[0].pass, rows[0].usuario, rows[0].id_administrador);
                    resolve(administrador);
                } else {
                    resolve(null); // Si no se encuentra el usuario
                }
            });
        });
    }
    
}

module.exports = UsuarioDAO;
