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
            
            .toast {
                position: fixed;
                bottom: 1.25rem;
                right: 1.25rem;
                background-color: #333;
                color: #fff;
                padding: 0.625rem;
                border-radius: 0.313rem;
                box-shadow: 0 0.125rem 0.313rem rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: space-between;
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
            }

            .toast.show {
                opacity: 1;
            }

            .toast-icon svg {
                width: 1.875rem;
                height: 1.25rem;
                fill: #fff;
            }

            .toast-content {
                font-family: Arial, sans-serif;
                font-size: 0.875rem;
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
                    <button id="submit" type="submit">Send Message</button>
                </div>
            </form>
            <div class="toast" id="toast">
                <div class="toast-content"></div>
                <div class="toast-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M15.795 8.342l-5.909 9.545a1 1 0 0 1-1.628 0l-3.182-4.909a1 1 0 0 1 1.629-1.165l2.556 3.953L14.165 7.51a1 1 0 0 1 1.63 1.165z"></path>
                    </svg>
                </div>
            </div>
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
        const submitButton = document.getElementById('submit');
        submitButton.disabled = true;
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());
        // await sendContactForm(formValues.name, formValues.email, formValues.message);
        setTimeout(() => {
            submitButton.disabled = false;
        }, 5000);
        form.reset();
        showToast('Your message has been sent successfully!');

    });

    function showToast(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            const toastContent = toast.querySelector('.toast-content');
            if (toastContent) {
                toastContent.textContent = message;
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }
        }
    }
}