import { isAuthenticated } from "../../_authentication/Authentication.js";
import { enableRouting, navigate } from "../../_routing/start.js";
import { getAllSpiders } from "../../services/home.js";

export async function HomePage() {
  let authenticated = await isAuthenticated();
  if (!isAuthenticated) {
    navigate("home");
  }
  const spiderArray = await getAllSpiders();
  /* TODO: Fix Responsiveness of Adoption Process Cards and Headers */
  const css = `
        <style>
          @keyframes jiggle {
            0% { transform: rotate(-5deg); }
            25% { transform: rotate(5deg); }
            50% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
            100% { transform: rotate(-5deg); }
          }
          .main {
            height: 90vh;
            width: 100vw;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
          .landing-container {
            height: 88vh;
            width: 100vw;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            padding: 1vh;
          }
          .info-container {
            display: flex;
            width: 40rem;
            max-width: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 4vh;
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
          }
          .adopt-heading {
            color: #ffaebc;
            font-weight: 600;
          }
          .landing-description {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 0.6rem;
            font-weight: 400;
            font-family: "DM Sans", sans-serif;
            margin: 0;
            max-width: 80%;
          }
          .spider-pic {
            min-width: 40rem
            min-height: 45vh;
            max-width: 100%;
          }
          .spider-pic:hover {
             animation: jiggle 0.5s infinite; 
          }
          button {
            min-width: 20vw;
            min-height: 6vh;
            width: 18rem;
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

          .adoption-container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background-color: #FFAEBC;
            flex-wrap: wrap;
            padding: 2vh;
            padding-bottom: 5vh;
          }
          
          .header {
            padding-top: 2vh;
            padding-bottom: 3vh;
          }
          .light {
            color: #FFFFFF;
          }
          .number {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #15524D;
            background-color: #A7EBE5;
            border-radius: 20rem;
            font-size: 1rem;
            font-weight: bold;
            font-family: "DM Sans", sans-serif;
            min-width: 8vh;
            min-height: 8vh;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          }
          .adoption-cards {
            display: flex;
            justify-content: space-evenly;
            width: 100%;
            flex-wrap: wrap;
          }
          .adoption-card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-width: 15rem;
          }
          .adoption-card--container {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 15rem;
            width: 15rem;
            min-height: 33vh;
            height: 33vh;
            padding: 2vh;
            background-color: #FFFFFF;
            border-radius: 1rem;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          }
          .adoption-card--header {
            font-size: 1rem;
            font-weight: bold;
            font-family: "DM Sans", sans-serif;
          }
          .adoption-card--text {
            font-size: 0.8rem;
            font-weight: 400;
            font-family: "DM Sans", sans-serif;
            max-width: 80%;
            text-align: center;
          }

          .spider-container{
            height: 50vh;
            display: flex;
            flex-direction: column;
            padding: 2vh;
          }
          .spider-cards-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            padding: 2vh;
            gap: 3vw;
          }

        </style>
    `;
  const html = `
        <main>

            <section class="landing-container">
              <article class="info-container">
                <h1>Looking to adopt an 8-legged friend?</h1>
                <p class="landing-description">Discover the realm of spider adoption with us! Dive into our carefully curated collection of arachnids to find your ideal eight-legged companion. Allow us to lead you through every step, from understanding their care needs to selecting the spider that suits you best. Embark on your spider adoption journey now!</p>
                <button>Adopt Now</button>
              </article>
              <img class="spider-pic" src="/assets/fluffy_spider.png" alt="Spider Picture">
            </section>

            <section class="adoption-container">
              <h1 class="header light">Adoption Process</h1>
              <article class="adoption-cards">
                <article class="adoption-card">
                  <p class="number">1.</p>
                  <article class="adoption-card--container">
                    <h3 class="adoption-card--header">Browse Available Spiders:</h3>
                    <p class="adoption-card--text">Explore our diverse selection of spiders waiting to find their forever homes. From the curious and adventurous to the gentle and shy, there's a spider for every personality. Take your time to browse through their profiles and learn about their unique traits and stories.</p>
                  </article>
                </article>
                <article class="adoption-card">
                  <p class="number">2.</p>
                  <article class="adoption-card--container">
                    <h3 class="adoption-card--header">Find Your Perfect Match:</h3>
                    <p class="adoption-card--text">Once you've found a spider that captures your heart, simply click the "Adopt Me" button on their profile. This signals your interest in welcoming them into your home and beginning your journey together.</p>
                  </article>
                </article>
                <article class="adoption-card">
                  <p class="number">3.</p>
                  <article class="adoption-card--container">
                    <h3 class="adoption-card--header">Fill Out the Adoption Form: </h3>
                    <p class="adoption-card--text">Complete our adoption form to ensure that you and your chosen spider are a perfect match. We'll ask you a few questions to better understand your lifestyle and preferences, ensuring a successful adoption experience for both you and your new companion.</p>
                  </article>
                </article>
                <article class="adoption-card">
                  <p class="number">4.</p>
                  <article class="adoption-card--container">
                    <h3 class="adoption-card--header">Await the News:</h3>
                    <p class="adoption-card--text">After submitting your adoption form, our team will review your application. If your application is successful, we'll coordinate a time for you to come and fetch your new eight-legged friend. Get ready  to welcome them into your home and start a wonderful new chapter together!</p>
                  </article>
                </article>
              </article>
            </section>

            <section class="spider-container">
              <h1 class="header">Available Spiders</h1>
                  <article class="spider-cards-container">
                      ${spiderArray
                        .map((spider) => {
                          return `<spider-card
                                        adoption-status="${spider.adoptionStatus}"  
                                        spider-name="${spider.name}" 
                                        species="${spider.species}"  
                                        photo="${spider.photo}"
                                        spider="${spider.id}"
                                        ></spider-card>`;
                        })
                        .join("")}
                  </article>
            </section>

        </main>
    `;

  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(
    new DOMParser().parseFromString(html, "text/html").body.firstChild
  );
  app.appendChild(
    new DOMParser().parseFromString(css, "text/html").head.firstChild
  );
  enableRouting("a");

  const button = document.querySelector("button");
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    navigate("browse");
  });
}
