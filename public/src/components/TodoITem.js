import { navigate } from "../_routing/start.js";
import { WebComponent } from "../_wrappers/WebComponent.js";
import { css } from "../_wrappers/css.js";

export class TodoItem extends WebComponent {
    identifier = 'todo-item';
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
        count: { type: Number}
    }
//TODO: Figure out event listeners for components
    render() {
        return `
            <button>Click me</button>
            <p>${this.getAttribute('count')}</p>
            <h1 class="test">Todo Item</h1>
            <a href="/">Base</a>
            <a href="https://www.google.co.za">Google</a>
            <button >Click me to go home (WORK IN PROGRESS - DOESN'T WORK YET)</button>
            <button id="btn"></button>
        `
    }

    listen() {
        const btn = this.shadowRoot.getElementById('btn');
        btn.addEventListener('click', () => this.hello());
    }

    hello() {
        console.log('Hello from todo item');

    }

}

customElements.define("todo-item", TodoItem)