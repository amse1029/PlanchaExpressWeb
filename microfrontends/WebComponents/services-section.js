class ServicesSection extends HTMLElement {
    constructor() {
        super();

        // Crear Shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Contenido del componente
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .services-section {
                    padding: 50px 20px;
                    text-align: center;
                    background-color: white;
                    color: black;
                }
                .services-container {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                .service-card {
                    background-color: #f4f4f4;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    width: 250px;
                    text-align: center;
                }
                .service-card h3 {
                    color: #333;
                }
                .service-card p {
                    color: black;
                }
            </style>
            <section class="services-section">
                <h2>Nuestros Servicios</h2>
                <div class="services-container">
                    <div class="service-card">
                        <h3>Lavado</h3>
                        <p>Mantenemos tus prendas impecables con nuestro lavado profesional.</p>
                    </div>
                    <div class="service-card">
                        <h3>Planchado</h3>
                        <p>Plancha perfecta para todas tus prendas, desde camisas hasta vestidos de gala.</p>
                    </div>
                    <div class="service-card">
                        <h3>Secado</h3>
                        <p>Secado eficiente y seguro para cualquier tipo de tejido.</p>
                    </div>
                </div>
            </section>
        `;

        // Adjuntar contenido al Shadow DOM
        shadow.appendChild(template.content.cloneNode(true));
    }
}

// Registrar el Web Component
customElements.define('services-section', ServicesSection);

