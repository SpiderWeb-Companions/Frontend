import { routes } from "../routes.js";
const BaseURL = window.location.href;
const parts = BaseURL.split('/');
const firstRoute=parts[3] ?? '' ;
const domain = `${parts[0]}//${parts[2]}/`;
/**
 * 
 * @param {*} route either a route defined in the route.js, or a link starting with http for redirect.
 */
export function navigate(route) {
    if (routes[route]) {
        const app = document.getElementById('app');
        app.innerHTML = `<${routes[route].identifier}></${routes[route].identifier}>`;
    } else if (route.includes('http')){
        window.location.href = route;
    } 
    else {
        console.error(`Page ${route} not found.`);
        if (route == ''){
            throw new Error(`UNRECOVERABLE ROUTING STATE: The site is failing to route to the ('') homepage. This should only happen if the '' route is not in the routes lookup in /routes.js `)
        }else{
            navigate(''); 
        }
    }
    history.pushState(null, null, `${domain}${route}`);
}

navigate(firstRoute);