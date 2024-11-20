class FormInfo extends HTMLElement {
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
			<form class="registration-form" action="http://localhost:3000/api/v1/clientes" method="POST">
				<h2>Formulario de Registro</h2>
				
				<label for="nombre">Nombre</label>
				<input type="text" id="nombre" name="nombre" placeholder="Escribe tu nombre" required>

				<label for="apellido">Apellido</label>
				<input type="text" id="apellido" name="apellido" placeholder="Escribe tu apellido" required>

				<label for="email">Correo Electrónico</label>
				<input type="email" id="email" name="email" placeholder="correo@ejemplo.com" required>

				<label for="password">Contraseña</label>
				<input type="password" id="password" name="password" placeholder="Escribe tu contraseña" required>

				<label for="confirm-password">Repetir Contraseña</label>
				<input type="password" id="confirm-password" name="confirm_password" placeholder="Repite tu contraseña" required>

				<button type="submit">Registrar</button>
			</form>
		`;
	}

	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./FormComponent/css/form.css"); // Ruta a tu archivo CSS
		shadow.appendChild(link);
	}
}

window.customElements.define("form-info", FormInfo);
