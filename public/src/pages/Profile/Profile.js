import { enableRouting } from "../../_routing/start.js";
import { getSpiders } from "../../services/profile.js";
import { SpiderCard } from "../../components/SpiderCard.js";
import { getUserDetails } from "../../_authentication/Authentication.js";

export async function ProfilePage(queryString) {
    // Grab from function
    // Coming soon...
    const user = await getUserDetails();
    const email = user.email;
    const name = user.name;
    const profilePic = user.picture;
    // const email = 'placeholder@gmail.com';
    // const name = 'John Doe';
    // const profilePic = 'https://via.placeholder.com/150';
    const spiderArray = await getSpiders(email);

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
                overflow: hidden;
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
                margin: 0;
                padding: 0;
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
              margin: 0;
                padding: 0;
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
            
            .spiders-container {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                flex-wrap: wrap;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                max-height: 100%;
                overflow-y: auto;
                gap: 1rem; 
                margin-bottom: 1.4rem;
            }
            
            .spiders-wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                height: 45vh;
                overflow: hidden;
            }
            
            .spiders h2 {
                align-self: flex-start;
                color: #FEFEFE;
                font-weight: bold;
                font-size: 2rem;
                padding: 0;
                margin: 0.5rem 0 1rem 1rem;
            }
            
            .spiders-container::-webkit-scrollbar {
                width: 0.75rem; 
            }
            
            .spiders-container::-webkit-scrollbar-track {
                background-color: #FFAEBC; 
                border-radius: 0.375rem;
            }
            
            .spiders-container::-webkit-scrollbar-thumb {
                background-color: #B1AFF2; 
                border-radius: 0.375rem;
            }
            
            .spiders-container::-webkit-scrollbar-thumb:hover {
                background-color: #B1AFF2;
            }
            
            .spiders-container {
                scrollbar-width: thin;
                scrollbar-color: #B1AFF2 #FFAEBC; 
            }
            
            .spiders-container::-webkit-scrollbar-button {
                display: none;
            }
            .profile {
              background-color: #FEFEFE;
              padding: 1rem;
            }
            
            .profile-container {
              display: flex;
              align-items: center;
              gap: 1rem;
            }

            .profile-info h2 {
              margin: 0;
              font-size: 1.5rem;
              font-weight: 500;
              font-family: "DM Sans", sans-serif;
              padding: 0;
            }
            
            .profile-info p {
              text-decoration: none;
              font-size: 1.2rem;
              padding: 0;
              margin: 0;
              font-weight: normal;
              font-family: "DM Sans", sans-serif;
            }
            
            @media (max-width: 480px) {
              .profile-container {
                flex-direction: column;
                align-items: center;
              }
              .profile-pic {
                  width: 10rem;
                  height: 10rem;
                  border-radius: 50%;
                  overflow: hidden;
              }
            }
        </style>
    `;
    const html = `
        <main>
            <section class="profile">
              <div class="profile-container">
                <div class="profile-pic">
                  <img src="${profilePic}">
                </div>
                <div class="profile-info">
                  <h2>${name}</h2>
                  <p>${email}</p>
                </div>
              </div>
            </section>
            <section class="spiders">
                <div class="spiders-wrapper">
                    <h2>My Spiders</h2>
                    <div class="spiders-container">
                        ${spiderArray.map(spider => {
                        return `<spider-card
                                        adoption-status="${spider.adoptionstatus}"
                                        spider-name="${spider.name}"
                                        species="${spider.species}"
                                        photo="${spider.photo}"
                                        ></spider-card>`
                        }).join('')}
                    </div>
                </div>
            </section>
        </main>
    `;
    const app = document.getElementById('app');
    app.innerHTML = "";
    app.appendChild(new DOMParser().parseFromString(html, 'text/html').body.firstChild);
    app.appendChild(new DOMParser().parseFromString(css, 'text/html').head.firstChild);
    enableRouting('a');

}