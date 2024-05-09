import { css } from "../../_wrappers/css.js";
import { html } from "../../_wrappers/html.js";
import { setAccessToken, isAuthenticated, getUserDetails} from "../../_authentication/Authentication.js"
import { enableRouting, navigate } from "../../_routing/start.js";


export async function LoginPage(queryString) {
    let authenticated = await isAuthenticated(); //add this to your component if you want it to check for authentication.
    const app = document.getElementById('app');
    app.innerHTML = `<h1> Loading</h1>`
    if (queryString && !authenticated ) {
        const params = new URLSearchParams(queryString);
        let code = params.get('code')
        setAccessToken(code);
        const css = `
        <style>
        main {
            height: 100vh;
            width: 100vw;
            display: flex;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            background-color: #FFF4F6;
          }
        .login-container {
            display: flex;
            width: 60%;
            height: 70%;
            background-color: #FFFFFF;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .logo-container{
            width: 35%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-item: center;
            background-color: #FFAEBC;
        }
        .spider-pic {
            padding: 2vh;
            width: 70%;
        }

        .info-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2vh;
            gap: 2vh;
        }
        
        h1 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 3rem;
            font-weight: 600;
            font-family: "DM Sans", sans-serif;
            margin: 0;
            width: 80%;
        }
        </style>
        `;
        const html = `
        <main>
            <article class="login-container">

                <section class="logo-container">
                    <img class="spider-pic" src="/assets/logo_large.svg" alt="Logo">
                </section>

                <section class="info-container">
                    <h1>Welcome to SpiderWeb Companions ${userInfo.name}!</h1>
                </section>

            </article>  
        </main>
        `
        app.innerHTML = "";
        app.appendChild(
        new DOMParser().parseFromString(html, "text/html").body.firstChild
        );
        app.appendChild(
        new DOMParser().parseFromString(css, "text/html").head.firstChild
        );
        enableRouting("a");
    
        const loginButton = this.shadowRoot.querySelector("button")
        loginButton.addEventListener("click", async (event) => {
            event.preventDefault();
            navigate("home");
        });
        enableRouting('a')
    } else if (authenticated){
        let userInfo = await getUserDetails();
        const css = `
        <style>
        main {
            height: 100vh;
            width: 100vw;
            display: flex;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            background-color: #FFF4F6;
          }
        .login-container {
            display: flex;
            width: 60%;
            height: 70%;
            background-color: #FFFFFF;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .logo-container{
            width: 35%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-item: center;
            background-color: #FFAEBC;
        }
        .spider-pic {
            padding: 2vh;
            width: 70%;
        }

        .info-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2vh;
            gap: 2vh;
        }
        
        button {
            min-width: 18vw;
            min-height: 6vh;
            background-color: #a7ebe5;
            color: #15524d;
            font-size: 0.8rem;
            font-weight: bold;
            font-family: "DM Sans", sans-serif;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 2rem;
          }
        button:hover {
            cursor: pointer;
        }
        h1 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 3rem;
            font-weight: 600;
            font-family: "DM Sans", sans-serif;
            margin: 0;
            width: 80%;
        }
        </style>
        `;
        const html = `
        <main>
            <article class="login-container">

                <section class="logo-container">
                    <img class="spider-pic" src="/assets/logo_large.svg" alt="Logo">
                </section>

                <section class="info-container">
                    <h1>Welcome to SpiderWeb Companions ${userInfo.name}!</h1>
                    <button id="login-button">View Home</button>
                </section>

            </article>  
        </main>
        `
        app.innerHTML = "";
        app.appendChild(
        new DOMParser().parseFromString(html, "text/html").body.firstChild
        );
        app.appendChild(
        new DOMParser().parseFromString(css, "text/html").head.firstChild
        );
        enableRouting("a");
    
        const loginButton = this.shadowRoot.querySelector("button")
        loginButton.addEventListener("click", async (event) => {
            event.preventDefault();
            navigate("home");
        });
        enableRouting('a')
    }else {

        const css = `
        <style>
        main {
            height: 100vh;
            width: 100vw;
            display: flex;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            background-color: #FFF4F6;
          }
        .login-container {
            display: flex;
            width: 60%;
            height: 70%;
            background-color: #FFFFFF;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .logo-container{
            width: 35%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-item: center;
            background-color: #FFAEBC;
        }
        .spider-pic {
            padding: 2vh;
            width: 70%;
        }

        .info-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2vh;
            gap: 2vh;
        }
        
        button {
            min-width: 18vw;
            min-height: 6vh;
            background-color: #a7ebe5;
            color: #15524d;
            font-size: 0.8rem;
            font-weight: bold;
            font-family: "DM Sans", sans-serif;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 2rem;
          }
        button:hover {
            cursor: pointer;
        }
        h1 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 3rem;
            font-weight: 600;
            font-family: "DM Sans", sans-serif;
            margin: 0;
            width: 80%;
        }
        p {
            font-size: 0.8rem;
            font-weight: 500;
            font-family: "DM Sans", sans-serif;
            }
        </style>
        `;

        const html = `
            <main>
                <article class="login-container">

                    <section class="logo-container">
                        <img class="spider-pic" src="/assets/logo_large.svg" alt="Logo">
                    </section>

                    <section class="info-container">
                        <h1>Welcome to SpiderWeb Companions</h1>
                        <p>Please login to continue</p>
                        <button id="loginbutton">Login</button>
                    </section>

                </article>
                
            </main>
            
        `
        app.innerHTML = "";
        app.appendChild(
        new DOMParser().parseFromString(html, "text/html").body.firstChild
        );
        app.appendChild(
        new DOMParser().parseFromString(css, "text/html").head.firstChild
        );
        enableRouting("a");
    
        const loginButton = document.getElementById("loginbutton");
        loginButton.addEventListener("click", async (event) => {
            event.preventDefault();
            navigate(`${AUTH_URL}?scope=${SCOPE}&response_type=code&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}`);
        });
        enableRouting('a')
    }
    
}

