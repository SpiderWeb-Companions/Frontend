import { enableRouting } from "../../_routing/start.js";
import { sendContactForm} from "../../services/contact.js";

export function ContactPage(queryString) {
    const css = `
        <style>
            main {
                min-height: 90vh;
                max-height: 90vh;
                background: rgb(255,174,188);
                background: linear-gradient(0deg, rgba(255,174,188,1) 0%, rgba(255,255,255,1) 80%);
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 0;
                padding: 0;
            }
            
            .title1,
            .title2 {
                font-size:4rem;
                 font-family: "DM Sans", sans-serif;
            }
            
            .title1 {
                margin: 0;
                font-weight: bold;
            }
            
            .title2 {
                margin: 1.5rem 0 5rem;
                font-weight: normal;
            }
            
            form {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }
            
            .form-group {
                width: 40vw;
                display: flex;
                align-items: center;
                margin-bottom: 0.8rem;
                border-bottom: 0.125rem solid white;
            }
    
            label {
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 0.3rem;
                padding-bottom: 0.4rem;
                font-family: "DM Sans", sans-serif;
            }
    
            input,
            textarea {
                background-color: transparent;
                font-family: "DM Sans", sans-serif;
                color: black;
                border: none;
                margin-bottom: 0.625rem;
                padding: 0.3rem;
                flex-grow: 1;
                font-size: 1.5rem;
                margin-left: 0.5rem ;
            }
            
            textarea {
                resize: none;
            }
            
            input:focus,
            textarea:focus {
                outline: none;
            }
    
            button {
                width: 13em;
                padding: 0.8rem 1.3rem;
                background-color: #A7EBE5;
                color: #15524D;
                font-weight: bold;
                border: none;
                cursor: pointer;
                border-radius: 1.875rem;
                font-size: 1rem;
            }
            
            .center-button {
                width: 40vw;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        </style>
    `;
    const html = `
        <main>
            <h1 class="title1">Have Some Questions?</h1>
            <h1 class="title2">Contact Us</h1>
            <form>
                <div class="form-group">
                    <label for="name">Name: </label>
                    <input type="text" id="name" name="name" required>
                </div>
    
                <div class="form-group">
                    <label for="email">Email: </label>
                    <input type="email" id="email" name="email" required>
                </div>
    
                <div class="form-group">
                    <label for="message">Message: </label>
                    <input id="message" name="message" required/>  
                </div>
                <div class="center-button">
                    <button type="submit">Send Message</button>
                </div>
            </form>
        </main>
    `;
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(new DOMParser().parseFromString(html, 'text/html').body.firstChild);
    app.appendChild(new DOMParser().parseFromString(css, 'text/html').head.firstChild);
    enableRouting('a')

    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());
        await sendContactForm(formValues.name, formValues.email, formValues.message);
    });
}