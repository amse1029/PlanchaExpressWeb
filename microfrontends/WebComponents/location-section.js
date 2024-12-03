class LocationSection extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
                .location-section {
                    background-color: #f4f4f4;
                    color: #333;
                    text-align: center;
                    padding: 50px 20px;
                }

                .location-section h2 {
                    font-size: 2em;
                    margin-bottom: 20px;
                    color: #05C7F2;
                }

                .location-section p {
                    font-size: 1.2em;
                    margin-bottom: 30px;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .map-container {
                    max-width: 400px;
                    margin: 0 auto;
                    border: 2px solid #ccc;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .map-container iframe {
                    width: 100%;
                    height: 250px;
                    border: none;
                }
            </style>
            <section class="location-section">
                <h2>Visítanos</h2>
                <p>Estamos ubicados en Matamoros y Galeana N° 35, Avenida Juárez, Colonia Centro, Huatabampo, Sonora.</p>
                <div class="map-container">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.446825344057!2d-109.6405104!3d26.825737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86b78b31edbdf05f%3A0xe695f85f1109950c!2sLavander%C3%ADa%20Plancha%20Express!5e0!3m2!1ses!2smx!4v1732167889010!5m2!1ses!2smx" 
                        allowfullscreen 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </section>
        `;
    }
}

// Define el nuevo elemento personalizado
customElements.define('location-section', LocationSection);
