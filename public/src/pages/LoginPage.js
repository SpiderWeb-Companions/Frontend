import { WebComponent } from "../_wrappers/WebComponent.js";
import { css } from "../_wrappers/css.js";
import { html } from "../_wrappers/html.js";
import { setAccessToken } from "../_authentication/Authentication.js"

export class LoginPage extends WebComponent {
    identifier = 'login-page';
    static authUrl = 'https://accounts.google.com/o/oauth2/auth';
    static scope = 'openid profile email';
    static clientId = '788254239785-ildidaodo59cco4j0k4aok89l8c8hip7.apps.googleusercontent.com';
    static redirectUri = 'http://localhost:4200/login';
    
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
        let queryString = this.getAttribute('queryparams');
        
        if (queryString && !sessionStorage.getItem('accessToken')) {
            const params = new URLSearchParams(queryString);
            let code = params.get('code')
            
            setAccessToken(code);
           
            return html`
                <h2>Waiting for authorisation</h2>
            `
        } else if (sessionStorage.getItem('accessToken')){
            return html`
            <h1>You've been successfully authenticated!!</h1>
            `
        }

        return html`
            <h1>SpiderWeb Companions</h1>
            <a href="${LoginPage.authUrl}?scope=${LoginPage.scope}&response_type=code&redirect_uri=${LoginPage.redirectUri}&client_id=${LoginPage.clientId}">Google authentication</a>
        `
    }

}



customElements.define("login-page", LoginPage)