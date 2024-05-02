import { WebComponent } from "../_wrappers/WebComponent.js";
import { css } from "../_wrappers/css.js";
import { html } from "../_wrappers/html.js";

export class BasePage extends WebComponent {
    identifier = 'base-page';
    constructor() {
        super();
    }
    static css = css`
        .test {
            color: green;
        }
        .todo-item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #ccc;
        }
    `

    static properties = {
        count: { type: Number, value: 0 }
    }

    sayHello() {
        console.log('Hello');
    }
    

    render() {
        return html`
            <h1>SpiderWeb Companions</h1>
            <a href="home">Home</a>
            <a href="login">Login</a>
        `
    }

}

customElements.define("base-page", BasePage)