const readlineSync = require('readline-sync');
const ClienteDAO = require('./ClienteDAO');
const QuejaDAO = require('./QuejaDAO');

// Instanciamos los DAOs
const clienteDAO = new ClienteDAO();
const quejaDAO = new QuejaDAO();

function menu() {
    console.log('\n--- Menú de Opciones ---');
    console.log('1. Ver todos los clientes');
    console.log('2. Agregar nuevo cliente');
    console.log('3. Eliminar cliente');
    console.log('4. Ver todas las quejas');
    console.log('5. Agregar nueva queja');
    console.log('6. Salir');
    const opcion = readlineSync.question('Elige una opción: ');

    switch (opcion) {
        case '1':
            clienteDAO.getAllClientes((clientes) => {
                console.log('\n--- Lista de Clientes ---');
                console.table(clientes);
                menu();
            });
            break;
        case '2':
            const nombre = readlineSync.question('Nombre del cliente: ');
            const apellido = readlineSync.question('Apellido del cliente: ');
            clienteDAO.addCliente(nombre, apellido, (id) => {
                console.log(`Nuevo cliente agregado con ID: ${id}`);
                menu();
            });
            break;
        case '3':
            const idClienteEliminar = readlineSync.question('ID del cliente a eliminar: ');
            clienteDAO.deleteCliente(idClienteEliminar, () => {
                console.log('Cliente eliminado');
                menu();
            });
            break;
        case '4':
            quejaDAO.getAllQuejas((quejas) => {
                console.log('\n--- Lista de Quejas ---');
                console.table(quejas);
                menu();
            });
            break;
        case '5':
            const mensaje = readlineSync.question('Mensaje de la queja: ');
            const idClienteQueja = readlineSync.question('ID del cliente asociado: ');
            quejaDAO.addQueja(mensaje, idClienteQueja, (id) => {
                console.log(`Nueva queja agregada con ID: ${id}`);
                menu();
            });
            break;
        case '6':
            console.log('Saliendo...');
            process.exit(0);
            break;
        default:
            console.log('Opción no válida');
            menu();
            break;
    }
}

// Iniciar el menú
menu();
