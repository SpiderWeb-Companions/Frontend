import { start } from "../_routing/start.js";
const BaseURL = window.location.href;
/**
 * This is a wrapper for creating web components
 * The aim of this class is to make creating web components more intuitive
 * Ie keep all the ugly code in one place so we can write neat code everywhere else 🎨
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
        Object.keys(this.constructor.properties).forEach(key => {
            this.setAttribute(key, this.constructor.properties[key]);
        });
        this.setupAttributeChangeCallbacks();
        this.EnableRouting();
    }

    /**
     * @static members
     * Variables required for styling and component attributes
     */
    static css;
    static properties = {}

    setupAttributeChangeCallbacks() {
        // TODO: figure this functions logic out for stateful 
        const properties = this.constructor.properties;
        const observedAttributes = Object.keys(properties);
        const attributeChangedCallback = (name, oldValue, newValue) => {
            if (observedAttributes.includes(name)) {
                this[name] = newValue;
                this.shadowRoot.innerHTML = `
                    <style>
                        ${this.constructor.css}
                    </style>
                    ${this.render()}
                `;
            }
        };
        const observedAttributesProxy = new Proxy({}, {
            set: function (target, key, value) {
                attributeChangedCallback(key, target[key], value);
                return true;
            }
        });
        this.attributeChangedCallback = attributeChangedCallback.bind(observedAttributesProxy);
        observedAttributes.forEach(attribute => {
            Object.defineProperty(this, attribute, {
                get() {
                    return this.getAttribute(attribute);
                },
                set(newValue) {
                    if (newValue !== null) {
                        this.setAttribute(attribute, newValue);
                    } else {
                        this.removeAttribute(attribute);
                    }
                }
            });
        });
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
                history.pushState(null, null, `${BaseURL}${href}`);
                start();
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