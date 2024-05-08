import { enableRouting } from "../../_routing/start.js";
import { getSpiderDetails } from "../../services/spiderProfile.js";

export async function SpiderProfile(queryString) {
  // const spiderDetails = await getSpiderDetails("admin");
  /* DATA HARDCODED FOR NOW (STYLING PURPOSES) UNTIL ID ISSUE RESOLVED */

  const css = `
        <style>
        .status-pill {
            position: relative;
            width: 6.5em;
            margin: 0 0 0 auto;
            padding: 0.4em 0.5em;
            border-radius: 0 1em;
            font-weight: bold;
        }
        .status-pending {
            background-color: #abc0ed;
            color: #193269;
        }

        .status-available {
            background-color: #a7ebc3;
            color: #1d6c3d;
        }

        .status-adopted {
            background-color: #ffaebc;
            color: #541520;
        }
        main {
            min-height: 90vh;
            max-height: 90vh;
            min-width: 100vw;
            max-width: 100vw;
            height: 100%;
            width: 100%;
            display: flex;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
          }
        .spider-picture-section {
          display: flex;
          flex-direction: column;
          width: 50%;
          justify-content: center;
          align-items: center;
        }
        .spider-pic {
            min-width: 40%;
            max-width: 70%;
            min-height: 50%;
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
        .spider-information-section {
           width: 40%;
           height: 80%;
           background-color: #FFFFFF;
           box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
           display: flex;
           flex-direction: column;
           gap: 2vh;
           align-items: center;
           padding: 2vh;
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
        .rescue-story {
          display: flex;
          flex-direction: column;
          font-size: 0.6rem;
          font-weight: 400;
          font-family: "DM Sans", sans-serif;
          margin: 0;
          gap: 1vh;
          max-width: 100%;
          padding: 2vh;
        }
        .spider-info-header {
          display: flex;
          align-items: center;
          text-align: center;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: "DM Sans", sans-serif;
          margin: 0;
          max-width: 80%;
        }
        .spider-info-text {
          display: flex;
          align-items: center;
          font-size: 0.6rem;
          font-weight: 400;
          font-family: "DM Sans", sans-serif;
          margin: 0;
        }
        .info-row-container {
          display: flex;
          width: 100%;
        }
        .info-field {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 2vh;
          gap: 1vh;
        }
        .info-squares-container {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        .info-square {
          display: flex;
          flex-direction: column;
          padding: 2vh;
          width: 7vw;
          height: 7vh;
          gap: 1vh;
          background-color: #FFAEBC;
          border-radius: 25px;
        }
        </style>
    `;
  const html = `
        <main>
            <section class="spider-picture-section">
                <img class="spider-pic" src="/assets/fluffy_spider.png" alt="Spider Picture">
                <button>Adopt Me</button>
            </section>

            <section class="spider-information-section">
                <p class="status-pill"></p>
                <h1>Spider Name</h1>
                <article class="rescue-story">
                    <h2 class="spider-info-header">Rescue Story:</h2>
                    <p class="spider-info-text">Meet Charlotte, our resilient little spider with a heart as big as her web! Charlotte's story begins in a cozy garden shed, where she was discovered by a kind-hearted gardener named Lily. Poor Charlotte had found herself tangled in a clump of leaves, struggling to free herself.

                      Now, Charlotte is ready to embark on a new adventure and find her forever home. Despite her humble beginnings, Charlotte is full of love and curiosity, eager to weave her way into the hearts of her new family. Will you be the one to give this brave little spider the happy ending she deserves?</p>
                </article>
                <article class="info-row-container">
                    <article class="info-field">
                        <h2 class="spider-info-header">Experience Level:</h2>
                        <p class="spider-info-text">Intermediate</p>
                    </article>
                    <article class="info-field">
                        <h2 class="spider-info-header">Habitat:</h2>
                        <p class="spider-info-text">Terrestrial, prefers dry environments</p>
                    </article>
                </article>
                <article class="info-row-container">
                    <article class="info-field">
                        <h2 class="spider-info-header">Temperament:</h2>
                        <p class="spider-info-text">Docile and calm</p>
                    </article>
                    <article class="info-field">
                        <h2 class="spider-info-header">Food:</h2>
                        <p class="spider-info-text">Insects such as crickets and mealworms</p>
                    </article>
                </article>
                <article class="info-squares-container">
                    <article class="info-square">
                        <h2 class="spider-info-header">Species:</h2>
                        <p class="spider-info-text">Mexican Redknee Tarantula</p>
                    </article>
                    <article class="info-square">
                        <h2 class="spider-info-header">Age:</h2>
                        <p class="spider-info-text">3 years old</p>
                    </article>
                    <article class="info-square">
                        <h2 class="spider-info-header">Sex:</h2>
                        <p class="spider-info-text">Female</p>
                    </article>
                    <article class="info-square">
                        <h2 class="spider-info-header">Health:</h2>
                        <p class="spider-info-text">Excellent</p>
                    </article>
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
}
