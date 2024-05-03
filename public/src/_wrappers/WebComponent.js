import { navigate } from "../_routing/start.js";
/**
 * This is a wrapper for creating web components
 * The aim of this class is to make creating web components more intuitive
 * Ie keep all the ugly code in one place so we can write neat code everywhere else 🎨
 * 
 * All of the <a> elements will use SPA routing for any components that extend web components
 * @returns web component
 */
export class WebComponent extends HTMLElement{

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                ${this.constructor.css}
            </style>
            ${this.render()}
        `;
        // console.log(this.properties);
        Object.keys(this.constructor.properties).forEach(key => {
            this.setAttribute(key, this.constructor.properties[key]);
        });
        this.EnableRouting();
    }

    /**
     * @static members
     * Variables required for styling and component attributes
     */
    static css;
    static properties = {}
    
    static get observedAttributes() {
        let props = [];
        Object.keys(this.properties).forEach(key => {
            props.push(key);
        });
        return props;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(name, oldValue, newValue);
    }

    /**
     * @listens 
     * This function is the core of ensuring the appllications routing works as an SPA
     */
    EnableRouting() {
        const anchorTags = this.shadowRoot.querySelectorAll('a');
        anchorTags.forEach(anchor => {
            anchor.addEventListener('click', function(event) {
                event.preventDefault();
                const href = anchor.getAttribute('href');
                navigate(href);
            });
        });
    }
    
    /**
     * @override
     * This function is just here to ensure something is spit out incase no 
     * render is defined within a component
     * @returns html template of app
     */
    render() {
        return `
            <h1>Please provide your own defenition for html!!</h1>
        `
    }
}

