import { enableRouting } from "../../_routing/start.js";
import { sendContactForm} from "../../services/contact.js";

export function ContactPage(queryString) {
    const app = document.getElementById('app');

    const css = `
        <style>
            main {
                min-height: 100vh;
                max-height: 100vh;
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
                border-bottom: 2px solid white;
            }
    
            label {
                font-weight: bold;
                margin-bottom: 5px;
            }
    
            input,
            textarea {
                background-color: transparent;
                color: black;
                border: none;
                margin-bottom: 10px;
                padding: 5px;
                flex-grow: 1;
            }
            
            textarea {
                resize: none;
            }
            
            input:focus,
            textarea:focus {
                outline: none;
            }
    
            button {
                padding: 10px 20px;
                background-color: black;
                color: white;
                border: none;
                cursor: pointer;
            }
        </style>
    `
    app.innerHTML = `
        ${css}
        <main>
            <h1>Have Some Questions?</h1>
            <h2>Contact Us</h2>
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
                    <textarea id="message" name="message" required></textarea>
                </div>

    
                <button type="submit">Submit</button>
            </form>
        </main>
    `
    enableRouting('a')

    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());
        await sendContactForm(formValues.name, formValues.email, formValues.message);
    });
}