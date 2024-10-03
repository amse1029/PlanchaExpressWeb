const connection = require('./bd_plancha_express');
const NotaRemision = require('./dominio/NotaRemision');
const ClienteDAO = require('./ClienteDAO');  // Para obtener el cliente asociado a la nota
const ServicioDAO = require('./ServicioDAO');  // Para obtener los servicios asociados

class NotaRemisionDAO {
    // Obtener todas las notas de remisión
    getAllNotas(callback) {
        connection.query('SELECT * FROM NotaRemision', async (err, rows) => {
            if (err) throw err;

            // Convertir cada resultado en una instancia de la clase NotaRemision
            const notasRemision = await Promise.all(rows.map(async row => {
                const clienteDAO = new ClienteDAO();
                const cliente = await this.getClientePromise(clienteDAO, row.id_cliente);

                const serviciosDAO = new ServicioDAO();
                const servicios = await this.getServiciosByNota(row.id_nota);

                return new NotaRemision(cliente, servicios, row.fecha_entrega, row.total);
            }));

            callback(notasRemision);
        });
    }

    // Obtener una nota de remisión por su ID
    getNotaById(id, callback) {
        connection.query('SELECT * FROM NotaRemision WHERE id_nota = ?', [id], async (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                const row = rows[0];

                // Obtener cliente
                const clienteDAO = new ClienteDAO();
                const cliente = await this.getClientePromise(clienteDAO, row.id_cliente);

                // Obtener servicios asociados a la nota
                const servicios = await this.getServiciosByNota(row.id_nota);

                // Crear instancia de NotaRemision
                const notaRemision = new NotaRemision(cliente, servicios, row.fecha_entrega, row.total);
                callback(notaRemision);
            } else {
                callback(null);  // Si no se encuentra la nota
            }
        });
    }

    // Agregar una nueva nota de remisión
    addNota(idCliente, fechaEntrega, total, callback) {
        connection.query('INSERT INTO NotaRemision (id_cliente, fecha_entrega, total) VALUES (?, ?, ?)', [idCliente, fechaEntrega, total], (err, result) => {
            if (err) throw err;
            callback(result.insertId);
        });
    }

    // Eliminar una nota de remisión
    deleteNota(id, callback) {
        connection.query('DELETE FROM NotaRemision WHERE id_nota = ?', [id], (err) => {
            if (err) throw err;
            callback();
        });
    }

    // Actualizar una nota de remisión
    updateNota(id, fechaEntrega, total, callback) {
        connection.query('UPDATE NotaRemision SET fecha_entrega = ?, total = ? WHERE id_nota = ?', [fechaEntrega, total, id], (err) => {
            if (err) throw err;
            callback();
        });
    }

    // Helper para obtener un cliente usando Promises
    getClientePromise(clienteDAO, idCliente) {
        return new Promise((resolve, reject) => {
            clienteDAO.getClienteById(idCliente, (cliente) => {
                resolve(cliente);
            });
        });
    }

    // Helper para obtener los servicios de una nota de remisión usando Promises
    getServiciosByNota(idNota) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Servicio WHERE id_nota = ?';
            connection.query(query, [idNota], (err, rows) => {
                if (err) reject(err);

                const servicios = rows.map(row => new Servicio(row.descripcion, row.precio, row.cantidad));
                resolve(servicios);
            });
        });
    }
}

module.exports = NotaRemisionDAO;
