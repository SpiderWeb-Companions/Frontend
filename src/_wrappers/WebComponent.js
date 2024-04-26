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
    }

    static css;
    static properties = {}

    setupAttributeChangeCallbacks() {
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

    render() {
        return `
            <h1>Please provide your own defenition for html!!</h1>
        `
    }
}