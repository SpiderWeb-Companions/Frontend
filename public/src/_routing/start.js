import { routes } from "../routes.js";
import { isAuthenticated } from '../_authentication/Authentication.js';
const firstRoute = window.location.pathname;
const domain = window.location.origin;

/**
 * 
 * @param {*} route either a route defined in the route.js, or a link starting with http for redirect.
 */
export async function navigate(route) {
    let urlQueryParams = window.location.search;
    let queryParams = route.includes('?') ? `?${route.split('?')[1]}` : undefined;
    queryParams = !queryParams ? urlQueryParams : `${queryParams}${urlQueryParams.replace('?','&')}`;
    if (route.startsWith('http')){
        window.location.href = route;
        return;
    } 
    route = route.split('?')[0]
    route = route.startsWith('/') ? route.slice(1) : route;
    route = route.endsWith('/') ? route.slice(0,-1) : route;

    if (routes[route]) {
        routes[route](queryParams);

        const body = document.body;
        const navBar = document.querySelector('nav-bar');
        if (navBar) {
            navBar.remove();
        }
        if(route !== "login" && route !== "logout") {
            body.prepend(new DOMParser().parseFromString(`<nav-bar></nav-bar>`, 'text/html').body.firstChild)

        }
        // const app = document.getElementById('app');
        // app.innerHTML = `<${routes[route].identifier} queryparams=${queryParams}></${routes[route].identifier}>`;
    } 
    else {
        console.error(`Page ${route} not found.`);
        if (route == ''){
            throw new Error(`UNRECOVERABLE ROUTING STATE: The site is failing to route to the ('') homepage. This should only happen if the '' route is not in the routes lookup in /routes.js `)
        }else{
            navigate(''); 
        }
    }
    history.pushState(null, null, `${domain}/${route}`);
}


/**
 * This enables all elements currently on the DOM to have their defaul eventlistener changed to navigate.
 * Set the href of the elements you're overriding to be the name of the page eg "login" to nav to the login page.
 * @param {string} element html element eg 'a'
 */

export function enableRouting(element) {
    const anchorTags = document.querySelectorAll(element);
    anchorTags.forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const href = anchor.getAttribute('href');
            navigate(href);
        });
    });
}

navigate('contact');
// if (await isAuthenticated()){
//     navigate(firstRoute);
// }else {
//     navigate('login') //TODO: perhaps a navigation param "navigation message" to tell the user why they were navigated would be good here
// }                     // Or perhaps a redirect location for the case of login
