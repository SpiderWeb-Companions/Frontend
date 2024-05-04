import { enableRouting } from "../../_routing/start.js";
import { TodoItem } from "../../components/TodoItem.js";

export function HomePage(queryString) {


    const app = document.getElementById('app');

    app.innerHTML = `
    <todo-item count="100"></todo-item>
    `
enableRouting('a');
}