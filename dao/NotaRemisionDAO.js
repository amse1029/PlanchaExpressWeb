const connection = require('../bd/bd_plancha_express');
const NotaRemision = require('../dominio/NotaRemision');
const ClienteDAO = require('../dao/ClienteDAO');  // Para obtener el cliente asociado a la nota
const ServicioDAO = require('../dao/ServicioDAO');  // Para obtener los servicios asociados
const Servicio = require('../dominio/Servicio');

class NotaRemisionDAO {
    // Obtener todas las notas de remisión
    async getAllNotas(callback) {
        connection.query('SELECT * FROM NotaRemision', async (err, rows) => {
            if (err) throw err;

            // Convertir cada resultado en una instancia de la clase NotaRemision
            const notasRemision = await Promise.all(rows.map(async row => {
                const clienteDAO = new ClienteDAO();
                const cliente = await this.getClientePromise(clienteDAO, row.id_cliente);

                const servicios = await this.getServiciosByNota(row.id_nota);

                return new NotaRemision(cliente, servicios, row.fecha_entrega, row.total, row.estado);
            }));

            callback(notasRemision);
        });
    }

    // Obtener una nota de remisión por su ID
    async getNotaById(id, callback) {
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
                const notaRemision = new NotaRemision(cliente, servicios, row.fecha_entrega, row.total, row.estado);
                callback(notaRemision);
            } else {
                callback(null);  // Si no se encuentra la nota
            }
        });
    }

    // Agregar una nueva nota de remisión
    addNota(idCliente, fechaEntrega, total, estado, callback) {
        connection.query('INSERT INTO NotaRemision (id_cliente, fecha_entrega, total, estado) VALUES (?, ?, ?, ?)', [idCliente, fechaEntrega, total, estado], (err, result) => {
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
    updateNota(id, fechaEntrega, total, estado, callback) {
        connection.query('UPDATE NotaRemision SET fecha_entrega = ?, total = ?, estado = ? WHERE id_nota = ?', [fechaEntrega, total, estado, id], (err) => {
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
            const query = `
            SELECT s.descripcion, s.precio, ns.cantidad
            FROM Servicio s
            JOIN NotaServicio ns ON s.id_servicio = ns.id_servicio
            WHERE ns.id_nota = ?`;

            connection.query(query, [idNota], (err, rows) => {
                if (err) reject(err);

                // Crear las instancias de Servicio con cantidad
                const servicios = rows.map(row => new Servicio(row.descripcion, row.precio, row.cantidad));
                resolve(servicios);
            });
        });
    }

    getNotaByFolioAndCliente(folio, idCliente, callback) {
        connection.query('SELECT * FROM NotaRemision WHERE id_nota = ? AND id_cliente = ?', [folio, idCliente], async (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                const row = rows[0];

                // Obtener cliente
                const clienteDAO = new ClienteDAO();
                const cliente = await this.getClientePromise(clienteDAO, row.id_cliente);

                // Obtener servicios asociados a la nota
                const servicios = await this.getServiciosByNota(row.id_nota);

                // Crear instancia de NotaRemision
                const notaRemision = new NotaRemision(cliente, servicios, row.fecha_entrega, row.total, row.estado);
                callback(notaRemision);
            } else {
                callback(null);  // Si no se encuentra la nota
            }
        });
    }
    
}

module.exports = NotaRemisionDAO;
