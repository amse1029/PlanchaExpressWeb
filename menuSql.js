const readline = require('readline');
const ClienteDAO = require('./ClienteDAO');
const NotaRemisionDAO = require('./NotaRemisionDAO');
const NotaServicioDAO = require('./NotaServicioDAO');
const ServicioDAO = require('./ServicioDAO');
const QuejaDAO = require('./QuejaDAO');
const ReporteServicios = require('./ReporteServicios');
const ReporteVentas = require('./ReporteVentas');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const clienteDAO = new ClienteDAO();
const notaRemisionDAO = new NotaRemisionDAO();
const notaServicioDAO = new NotaServicioDAO();
const servicioDAO = new ServicioDAO();
const quejaDAO = new QuejaDAO();
const reporteServicios = new ReporteServicios();
const reporteVentas = new ReporteVentas();

function menu() {
    console.log(`
1. Listar clientes
2. Agregar cliente
3. Listar notas de remisión
4. Agregar nota de remisión
5. Listar servicios
6. Agregar servicio
7. Listar quejas
8. Agregar queja
9. Listar NotaServicio
10. Agregar NotaServicio
11. Reporte de Servicios
12. Reporte de Ventas
0. Salir
    `);

    rl.question('Selecciona una opción: ', (option) => {
        switch (option) {
            case '1':
                listarClientes();
                break;
            case '2':
                agregarCliente();
                break;
            case '3':
                listarNotas();
                break;
            case '4':
                agregarNota();
                break;
            case '5':
                listarServicios();
                break;
            case '6':
                agregarServicio();
                break;
            case '7':
                listarQuejas();
                break;
            case '8':
                agregarQueja();
                break;
            case '9':
                listarNotaServicio();
                break;
            case '10':
                agregarNotaServicio();
                break;
            case '11':
                rl.question('Reporte Diario, Semanal o Mensual? ', (tipo) => {
                    const [fechaInicio, fechaFin] = reporteServicios.getFechasReporte(tipo.toLowerCase());
                    reporteServicios.generarReporteServicios(fechaInicio, fechaFin, menu);
                });
                break;
            case '12':
                rl.question('Reporte Diario, Semanal o Mensual? ', (tipo) => {
                    const [fechaInicio, fechaFin] = reporteVentas.getFechasReporte(tipo.toLowerCase());
                    reporteVentas.generarReporteVentas(fechaInicio, fechaFin, menu);
                });
                break;
            case '0':
                rl.close();
                connection.end();  // Cerrar conexión a la BD
                break;
            default:
                console.log('Opción no válida');
                menu();
                break;
        }
    });
}

function listarClientes() {
    clienteDAO.getAllClientes((clientes) => {
        console.log(clientes);
        menu();
    });
}

function agregarCliente() {
    rl.question('Nombre: ', (nombre) => {
        rl.question('Apellido: ', (apellido) => {
            clienteDAO.addCliente(nombre, apellido, (id) => {
                console.log(`Cliente agregado con ID: ${id}`);
                menu();
            });
        });
    });
}

function listarNotas() {
    notaRemisionDAO.getAllNotas((notas) => {
        //console.log(JSON.stringify(notas, null, 2));
        notas.forEach(nota => {
            console.log(`Cliente: ${nota.cliente.nombre} ${nota.cliente.apellido}`);
            console.log(`Fecha de Entrega: ${nota.fecha_entrega}`);
            console.log(`Total: ${nota.total}`);

            console.log('Servicios:');
            nota.servicios.forEach(servicio => {
                console.log(`- Descripción: ${servicio.descripcion}, Precio: ${servicio.precio}, Cantidad: ${servicio.cantidad}`);
            });

            console.log('--------------------');  // Separador entre notas
        });
        menu();
    });
}

function agregarNota() {
    rl.question('ID Cliente: ', (idCliente) => {
        rl.question('Fecha de entrega (YYYY-MM-DD): ', (fechaEntrega) => {
            rl.question('Total: ', (total) => {
                notaRemisionDAO.addNota(idCliente, fechaEntrega, total, (id) => {
                    console.log(`Nota de remisión agregada con ID: ${id}`);
                    menu();
                });
            });
        });
    });
}

function listarServicios() {
    servicioDAO.getAllServicios((servicios) => {
        console.log(servicios);
        menu();
    });
}

function agregarServicio() {
    rl.question('Descripción: ', (descripcion) => {
        rl.question('Precio: ', (precio) => {
            rl.question('Cantidad: ', (cantidad) => {
                servicioDAO.addServicio(descripcion, precio, cantidad, (id) => {
                    console.log(`Servicio agregado con ID: ${id}`);
                    menu();
                });
            });
        });
    });
}

function listarQuejas() {
    quejaDAO.getAllQuejas((quejas) => {
        console.log(quejas);
        menu();
    });
}

function agregarQueja() {
    rl.question('Mensaje de queja: ', (mensaje) => {
        rl.question('ID Cliente: ', (idCliente) => {
            quejaDAO.addQueja(mensaje, idCliente, (id) => {
                console.log(`Queja agregada con ID: ${id}`);
                menu();
            });
        });
    });
}

function listarNotaServicio() {
    notaServicioDAO.getAllNotasServicios((notasServicios) => {
        console.log(notasServicios);
        menu();
    });
}

function agregarNotaServicio() {
    rl.question('ID Nota: ', (idNota) => {
        rl.question('ID Servicio: ', (idServicio) => {
            notaServicioDAO.addNotaServicio(idNota, idServicio, (id) => {
                console.log(`NotaServicio agregada con ID: ${id}`);
                menu();
            });
        });
    });
}

menu();
