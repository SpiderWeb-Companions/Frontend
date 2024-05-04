import { css } from "../../_wrappers/css.js";
import { html } from "../../_wrappers/html.js";
import { setAccessToken, isAuthenticated} from "../../_authentication/Authentication.js"
import { enableRouting } from "../../_routing/start.js";


    let identifier = 'login-page';
    let authUrl = 'https://accounts.google.com/o/oauth2/auth';
    let scope = 'openid profile email';
    let clientId = '788254239785-ildidaodo59cco4j0k4aok89l8c8hip7.apps.googleusercontent.com';
    let redirectUri = 'http://localhost:4200/login';



    export async function LoginPage(queryString) {
        let authenticated = await isAuthenticated(); //add this to your component if you want it to check for authentication.
        const app = document.getElementById('app');
        app.innerHTML = `<h1> Loading</h1>`
        if (queryString && !authenticated ) {
            const params = new URLSearchParams(queryString);
            let code = params.get('code')
            
            setAccessToken(code);
           
            app.innerHTML =  html`
                <h2>Waiting for authorisation</h2>
            `
        } else if (authenticated){
            app.innerHTML =  html`
            <h1>You've been successfully authenticated!!</h1>
            `
        }else{

        app.innerHTML =  html`
            <h1>SpiderWeb Companions</h1>
            <a href="${authUrl}?scope=${scope}&response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}">Google authentication</a>
        `
        }
        enableRouting('a')
    }


    
//    export function LoginPage() {

//         if (LoginPage.properties.htmlResponse.getHtmlResponse() == '') {
//             this.renderAsync()
//             return `Loader`
//         } else{
//             const htmlResponse = LoginPage.properties.htmlResponse.getHtmlResponse().value;
//             LoginPage.properties.htmlResponse.setHtmlResponse('');
//             return htmlResponse;
//         }

//     }

