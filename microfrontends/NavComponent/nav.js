class Navbar extends HTMLElement {
	constructor() {
	  super();
	}
  
	connectedCallback() {
	  const shadow = this.attachShadow({ mode: "open" });
	  this.#agregaEstilo(shadow);
	  this.#render(shadow);
	}
  
	#render(shadow) {
	  shadow.innerHTML = `
	  <nav class="navbar">
		<a href="#" class="navbar-brand">
		  <img src="./img/logo.jpg" alt="PlanchaExpress Logo" class="navbar-logo">
		</a>
		<div class="navbar-nav">
		  <a href="#" class="nav-link">Iniciar sesión |</a>
		  <a href="#" class="nav-link">Registrarse |</a>
		  <a href="#" class="nav-link">Consultar nota de remisión |</a>
		  <a href="#" class="nav-link">Registrar queja |</a>
		  <a href="#" class="nav-link">Contacto |</a>
		</div>
	  </nav>
	  `;
	}
  
	#agregaEstilo(shadow) {
	  let link = document.createElement("link");
	  link.setAttribute("rel", "stylesheet");
	  link.setAttribute("href", "./NavComponent/css/nav.css");
	  shadow.appendChild(link);
	}
  }
  
  window.customElements.define('navbar-component', Navbar);
  