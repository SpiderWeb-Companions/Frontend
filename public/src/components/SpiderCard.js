import { WebComponent } from "../_wrappers/WebComponent.js";
import { css } from "../_wrappers/css.js";
import { html } from "../_wrappers/html.js";

export class SpiderCard extends WebComponent {
    identifier = 'spider-card';
    constructor() {
        super();
    }
    static css = css`
        .card-class {
            border: 0.05em solid #ccc;
            margin: 0.5em;
            border-radius: 1em;
            width: 100%;
            text-align: center;
            transition: transform 0.1s ease-in-out;
            box-shadow: 0em 0.2em 0.2em
                rgba(0, 0, 0, 0.3);
        }
        
        .card-class:hover {
            transform: scale(1.1);
        }
        
        .card-content {
            padding: 0.5em 0.75em;
        }
        
        .img-box {
            margin: 0.5em;
        }
        
        .images {
            max-width: 100%;
            height: auto;
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
    `

    static properties = {
        count: { type: Number}
    }

    render() {
        return html
        `<article class='card-class'>
            <p class = "status-pill status-${this.getAttribute('adoption-status').toLowerCase()}">${this.getAttribute('adoption-status')}</p>
            <section class="card-content">
                <h2>${this.getAttribute('name')}</h2>
                <p>${this.getAttribute('species')}</p>
                <section class='img-box'>
                    <img class='images' src=${this.getAttribute('photo')}></img>
                </section>
            </section>
        </article>`
    }

}

customElements.define("spider-card", SpiderCard)