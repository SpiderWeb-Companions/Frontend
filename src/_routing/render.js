import { routes } from "../routes.js";
export function render(route) {
    if (routes[route]) {
        const app = document.getElementById('app');
        app.innerHTML = `<${routes[route].identifier}></${routes[route].identifier}>`;
    } else {
        throw new Error(`Page ${route} not found.`);
    }
}
