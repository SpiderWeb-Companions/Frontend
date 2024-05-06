import { WebComponent } from "../_wrappers/WebComponent.js";
import { css } from "../_wrappers/css.js";
import { html } from "../_wrappers/html.js";

export class SpiderCard extends WebComponent {
    identifier = 'spider-card';
    constructor() {
        super();
    }
    static css = css`
        <style>
        .card-class {
            border: 0.05em solid #ccc;
            //margin: 0.5em;
            border-radius: 1em;
            width: 100%;
            min-width: 16.25rem;
            min-height: 15rem;
            max-height: 15rem;
            text-align: center;
            transition: transform 0.1s ease-in-out;
            box-shadow: 0 0.2em 0.2em rgba(0, 0, 0, 0.3);
            background-color: #FFFFFF;
        }

        .card-class:hover {
            transform: scale(1.1);
        }

        .card-content {
            //padding: 0.5em 0.75em;
            //padding: 0;
        }

        .img-box {
            margin: 0.5em;
        }

        .images {
            width: auto;
            //height: auto;
            height: 6rem;
        }

        p {
            font-size: 1em;
        }

        h2 {
            font-size: 1.5em;
        }

        .status-pill {
            position: relative;
            width: 6.5em;
            margin: 0 0 0 auto;
            padding: 0.4em 0.5em;
            border-radius: 0 1em;
            font-weight: bold;
        }

        .status-pending {
            background-color: #abc0ed;
            color: #193269;
        }

        .status-available {
            background-color: #a7ebc3;
            color: #1d6c3d;
        }

        .status-adopted {
            background-color: #ffaebc;
            color: #541520;
        }
        </style>
    `

    static properties = {
        'adoption-status' : {type : String},
        'spider-name' : {type: String},
        'species' : {type: String},
        'photo' : {type: String},
    }

    static get template() {
        const template = document.createElement('template');
        template.innerHTML = `
            ${SpiderCard.css}
            <article class='card-class'>
                <p class="status-pill"></p>
                <section class="card-content">
                    <h2 id="spider-name"></h2>
                    <p id="species"></p>
                    <section class='img-box'>
                        <img class='images' />
                    </section>
                </section>
            </article>
        `;
        return template;
    }

    render() {
        const statusPill = this.shadowRoot.querySelector('.status-pill');
        const adoptionStatus = this.getAttribute('adoption-status');
        statusPill.innerText = adoptionStatus;
        statusPill.classList.add(`status-${adoptionStatus.toLowerCase()}`);

        const spiderName = this.shadowRoot.querySelector('#spider-name');
        spiderName.innerText = this.getAttribute('spider-name');

        const speciesInfo = this.shadowRoot.querySelector('#species');
        speciesInfo.innerText = this.getAttribute('species');

        const img = this.shadowRoot.querySelector('img');
        img.src = this.getAttribute('photo');
    }

}


customElements.define("spider-card", SpiderCard)