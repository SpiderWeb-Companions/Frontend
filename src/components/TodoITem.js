import { WebComponent } from "../_wrappers/WebComponent.js";
import { css } from "../_wrappers/css.js";
import { html } from "../_wrappers/html.js";

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
        count: { type: Number, value: 0 }
    }
    

    render() {
        return html`
            <button>Click me</button>
            <p>${this.getAttribute('count')}</p>
            <h1 class="test">Todo Item</h1>
            
            <a href="#home">Home</a>
            <a href="#about">About</a>
        `
    }

}

customElements.define("todo-item", TodoItem)