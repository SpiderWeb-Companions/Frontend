export async function LogoutPage(queryString) {

    let html ='';
    try {
        sessionStorage.clear();
    } catch (error) {
        html = `
        <h2>Failed to logout - logging out can be achieved by closing the tab</h2>`
    }

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
        html = `
        <main>
            <article class="login-container">

                <section class="logo-container">
                    <img class="spider-pic" src="/assets/logo_large.svg" alt="Logo">
                </section>

                <section class="info-container">
                    <h1>You have successfully logged out</h1>
                    <button id="login-button">Login</button>
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

        const button = document.querySelector("button");
        button.addEventListener("click", async (event) => {
            event.preventDefault();
            navigate("login");
        });
}