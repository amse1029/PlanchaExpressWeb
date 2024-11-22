// navbar.js
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
        <a href="../Paginas/index1.html"><img src="../img/logo.jpg" alt="Logo"></a>
        <a href="../Paginas/consultarNota.html">Consultar Nota de Remisión</a>
        <a href="../Paginas/registrarQueja.html">Registrar Queja</a>
        <a href="../Paginas/contacto1.html">Contacto</a>
        <a href="#" onclick="cerrarSesion()">Cerrar Sesión</a>
    `;

    function cerrarSesion() {
        localStorage.removeItem('jwtToken');
        alert('Sesión cerrada.');
        window.location.href = '../Paginas/index.html';
    }

    // Añadir el navbar al inicio del body
    document.body.prepend(navbar);
});
