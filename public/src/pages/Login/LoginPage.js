import { css } from "../../_wrappers/css.js";
import { html } from "../../_wrappers/html.js";
import { setAccessToken, isAuthenticated, getUserDetails} from "../../_authentication/Authentication.js"
import { enableRouting } from "../../_routing/start.js";


    let identifier = 'login-page';
    let authUrl =  process.env.AUTH_URL;
    let scope = process.env.SCOPE;
    let clientId = process.env.CLIENT_ID;
    let redirectUri = process.env.REDIRECT_URI;



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
            let userInfo = await getUserDetails();
            app.innerHTML =  html`
            <h1>You've been successfully authenticated!!</h1>
            <p> ${userInfo.name} </p>
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

