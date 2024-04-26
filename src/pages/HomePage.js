import { WebComponent } from "../_wrappers/WebComponent.js";
import { css } from "../_wrappers/css.js";
import { html } from "../_wrappers/html.js";
import { TodoItem } from '../components/TodoITem.js';

export class HomePage extends WebComponent {
    identifier = 'home-page';
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
            <todo-item></todo-item>
        `
    }

}

customElements.define("home-page", HomePage)