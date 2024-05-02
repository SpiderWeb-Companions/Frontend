import { routes } from "../routes.js";
import { isAuthenticated, setAccessToken } from '../_authentication/Authentication.js';
const firstRoute = window.location.pathname;
const domain = window.location.origin;

/**
 * 
 * @param {*} route either a route defined in the route.js, or a link starting with http for redirect.
 */
export function navigate(route) {
    route = route.startsWith('/') ? route.slice(1) : route;
    let queryParams = window.location.search;
    if (routes[route]) {
        const app = document.getElementById('app');
        app.innerHTML = `<${routes[route].identifier} queryparams=${queryParams}></${routes[route].identifier}>`;
    } else if (route.startsWith('http')){
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
    history.pushState(null, null, `${domain}/${route}`);
}
let isAuthed = await isAuthenticated()
if (isAuthed){
    navigate(firstRoute);
}else {
    navigate('login') //TODO: perhaps a navigation param "navigation message" to tell the user why they were navigated would be good here
}                     // Or perhaps a redirect location for the case of login
