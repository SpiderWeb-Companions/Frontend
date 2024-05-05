import { enableRouting } from "../../_routing/start.js";
import { sendContactForm} from "../../services/contact.js";

export async function ProfilePage(queryString) {
    // Grab from function
    // Coming soon...
    const email = 'placeholder@gmail.com';
    const name = 'John Doe';
    const profilePic = 'https://via.placeholder.com/150';

    const app = document.getElementById('app');
    const css = `
        <style>
            main {
                min-height: 90vh;
                max-height: 90vh;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 0;
                padding: 0;
            }
            
            .profile,
            .spiders {
                height: 45vh;
                max-height: 45vh;
                min-height: 45vh;
                width: 100vw;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            
            .profile {
                background-color: #FEFEFE;
            }
            
            .spiders { 
                background-color: #FFAEBC;
            }
            
            .profile-section {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            
            .profile-container {
              display: flex;
              align-items: center;
            }
            
            .profile-pic {
              width: 12.875rem;
              height: 12.875rem;
              border-radius: 50%;
              overflow: hidden;
            }
            
            .profile-pic img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            
            .profile-info {
              margin-left: 3rem;
            }
            
            .profile-info h2 {
              margin: 0;
              font-size: 3rem;
              font-weight: 500;
              font-family: "DM Sans", sans-serif;
              padding: :0;
            }
            
            .profile-info p {
              text-decoration: none;
              font-size: 2.5rem;
              padding: 0;
              margin: 0;
              font-weight: normal;
              font-family: "DM Sans", sans-serif;
            } 
        </style>
    `
    const spiders  = [1,2,3];
    app.innerHTML = `
        ${css}
        <main>
            <section class="profile">
               <figure class="profile-container">
                <div class="profile-pic">
                  <img src="${profilePic}" alt="Profile Picture">
                </div>
                <figcaption class="profile-info">
                  <h2>${name}</h2>
                  <p>${email}</p>
                </figcaption>
              </figure>
            </section>
            <section class="spiders">
            </section>
        </main>
    `
    enableRouting('a')

}