import { render } from "./render.js";
const BaseURL = window.location.href;
export function start() {
    const currentURL = window.location.href;
    if(currentURL == BaseURL) {
        render('');
        return;
    }
    const parts = currentURL.split('/');
    const route = parts[parts.length - 1];
    render(route);
}

render('');