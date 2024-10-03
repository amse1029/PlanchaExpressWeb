const ReporteServiciosDAO = require('./ReporteServiciosDAO');
const Servicio = require('./dominio/Servicio');

// Crear una instancia de ReporteServiciosDAO
const reporteServiciosDAO = new ReporteServiciosDAO();

// Prueba para agregar un nuevo reporte de servicios
function testAgregarReporteServicios() {
    // Crear algunos servicios de ejemplo
    const servicio1 = new Servicio('Lavado de camisa', 50.00, 2);
    const servicio2 = new Servicio('Planchado de pantalón', 30.00, 3);
    const servicios = [servicio1, servicio2];

    // Agregar el reporte de servicios
    const fecha = new Date(); // Fecha actual
    reporteServiciosDAO.addReporteServicios(fecha, servicios, (insertId) => {
        console.log(`Reporte de servicios agregado con ID: ${insertId}`);
        
        // Obtener el reporte agregado por su ID para verificar
        testObtenerReporteServiciosPorId(insertId);
    });
}

// Prueba para obtener todos los reportes de servicios
function testObtenerTodosLosReportesServicios() {
    reporteServiciosDAO.getAllReportesServicios((reportesServicios) => {
        console.log('Todos los reportes de servicios:');
        reportesServicios.forEach((reporte, index) => {
            console.log(`Reporte ${index + 1}: Fecha: ${reporte.fecha}`);
            reporte.servicios.forEach((servicio) => {
                console.log(` - Servicio: ${servicio.descripcion}, Precio: ${servicio.precio}, Cantidad: ${servicio.cantidad}`);
            });
        });
    });
}

// Prueba para obtener un reporte de servicios por su ID
function testObtenerReporteServiciosPorId(id) {
    reporteServiciosDAO.getReporteServiciosById(id, (reporteServicios) => {
        if (reporteServicios) {
            console.log(`Reporte de servicios con ID ${id}:`);
            console.log(`Fecha: ${reporteServicios.fecha}`);
            reporteServicios.servicios.forEach((servicio) => {
                console.log(` - Servicio: ${servicio.descripcion}, Precio: ${servicio.precio}, Cantidad: ${servicio.cantidad}`);
            });
        } else {
            console.log(`No se encontró ningún reporte de servicios con ID: ${id}`);
        }
    });
}

// Ejecutar las pruebas
testAgregarReporteServicios();
testObtenerTodosLosReportesServicios();
