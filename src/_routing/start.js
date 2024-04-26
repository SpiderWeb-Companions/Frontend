import { render } from "./render.js";
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', function(event) {
        const currentURL = window.location.href;
        event.preventDefault();
        const href = link.getAttribute('href');
        history.pushState(null, null, `${currentURL}${href}`);
        start();
    });
});

function start() {
    const currentURL = window.location.href;
    const parts = currentURL.split('/');
    const route = parts[parts.length - 1];
    render(route);
}