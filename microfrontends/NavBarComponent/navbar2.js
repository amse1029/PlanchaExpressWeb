// navbar para administradores.js
document.addEventListener('DOMContentLoaded', () => {
    // Crear e insertar el enlace al CSS del navbar
    const navbarStyles = document.createElement('link');
    navbarStyles.rel = 'stylesheet';
    navbarStyles.href = '../NavBarComponent/css/navbar.css';
    document.head.appendChild(navbarStyles);

    // Crear el navbar
    const navbar = document.createElement('div');
    navbar.className = 'navbar';
    navbar.innerHTML = `
        <a href="../Paginas/index2.html"><img src="../img/logo.jpg" alt="Logo"></a>
        <a href="../Paginas/reporteServicios.html">Reporte de Servicios</a>
        <a href="../Paginas/reporteVentas.html">Reporte de Ventas</a>
        <a href="../Paginas/reporteQuejas.html">Reporte de Quejas</a>
        <a href="#" id="logoutLink">Cerrar Sesión</a>
    `;

    // Añadir el navbar al inicio del body
    document.body.prepend(navbar);

    // Asociar el evento de cerrar sesión al enlace
    const logoutLink = document.getElementById('logoutLink');
    logoutLink.addEventListener('click', cerrarSesion);
});

// Definir la función cerrarSesion globalmente
    function cerrarSesion() {
    localStorage.removeItem('jwtToken');
    alert('Sesión cerrada.');
    window.location.href = '../Paginas/index.html';
}

