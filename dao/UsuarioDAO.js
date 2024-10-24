const connection = require('../bd/bd_plancha_express');
const Usuario = require('../dominio/Usuario');

class UsuarioDAO {
    // Obtener todos los usuarios
    getAllUsuarios(callback) {
        connection.query('SELECT * FROM Usuario', (err, rows) => {
            if (err) throw err;

            // Convertir cada resultado en una instancia de la clase Usuario
            const usuarios = rows.map(row => new Usuario(row.usuario, row.pass));
            callback(usuarios);
        });
    }

    getUsuarioByUsername(username) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Usuario WHERE usuario = ?', [username], (err, rows) => {
                if (err) return reject(err);
    
                if (rows.length > 0) {
                    // Crear una instancia de Usuario con los datos obtenidos
                    const usuario = new Usuario(rows[0].usuario, rows[0].pass);
                    resolve(usuario);
                } else {
                    resolve(null); // Si no se encuentra el usuario
                }
            });
        });
    }
    

    // Obtener un usuario por su ID
    getUsuarioById(id, callback) {
        connection.query('SELECT * FROM Usuario WHERE id_usuario = ?', [id], (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                // Crear una instancia de Usuario con los datos obtenidos
                const usuario = new Usuario(rows[0].usuario, rows[0].pass);
                callback(usuario);
            } else {
                callback(null); // Si no se encuentra el usuario
            }
        });
    }

    // Agregar un nuevo usuario
    addUsuario(usuario, pass, callback) {
        connection.query('INSERT INTO Usuario (usuario, pass) VALUES (?, ?)', [usuario, pass], (err, result) => {
            if (err) throw err;
            callback(result.insertId);
        });
    }

    // Eliminar un usuario
    deleteUsuario(id, callback) {
        connection.query('DELETE FROM Usuario WHERE id_usuario = ?', [id], (err) => {
            if (err) throw err;
            callback();
        });
    }
}

module.exports = UsuarioDAO;
