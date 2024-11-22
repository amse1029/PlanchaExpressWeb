// navbar para clientes.js
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
