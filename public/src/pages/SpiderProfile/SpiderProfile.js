import { enableRouting, navigate } from "../../_routing/start.js";
import { isAuthenticated } from "../../_authentication/Authentication.js";
import { getSpiderDetails } from "../../services/spiderProfile.js";

export async function SpiderProfile(queryString) {
  let spiderDetails = '';
  let id = -1;
  if (queryString) {
    const params = new URLSearchParams(queryString);
    id = params.get('id')
    spiderDetails = await getSpiderDetails(id);
  }

  const css = `
    <style>
      .status-pill {
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }
      .status-pill--text {
        padding: 0.4em 0.5em;
        border-radius: 0 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 6.5em;
        font-weight: bold;
        font-family: "DM Sans", sans-serif;
        font-size: 0.8rem;
        margin: 0;
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
            height: 88vh;
            width: 100vw;
            display: flex;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            overflow: auto;
          }
        .spider-picture-section {
          display: flex;
          flex-direction: column;
          width: 50%;
          min-width: 31.25rem;
          justify-content: center;
          align-items: center;
          gap: 2vh;
        }
        .spider-pic {
            min-width: 40%;
            max-width: 70%;
            min-height: 50%;
            padding: 2vh;
          }
        .button {
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
        .button:hover {
          cursor: pointer;
        }
        .button--disabled {
          background-color: #D6D6D6;
          color: #4C4C4C;
        }
        .button--disabled:hover {
          cursor: not-allowed;
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
           min-width: 20rem;
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
          align-self: start;
        }
        .spider-info-header {
          display: flex;
          align-items: center;
          text-align: center;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: "DM Sans", sans-serif;
          margin: 0;
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
          align-items: flex-end;
          width: 100%;
          height: 20vh;
          gap: 1vw;
        }
        .info-square {
          display: flex;
          flex-direction: column;
          padding: 2vh;
          height: 30%;
          width: 100%;
          gap: 1vh;
          background-color: #FFAEBC;
          border-radius: 1rem;
        }
        .text-center {
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        </style>
    `;
  const html = `
        <main>
            <section class="spider-picture-section">
                <img class="spider-pic" src="${spiderDetails.photo}" alt="Spider Picture">
                <button id="adoptMeButton" class="button">Adopt Me</button>
            </section>

            <section class="spider-information-section">
                <article class="status-pill">
                  <p class="status-pill--text">${spiderDetails.adoptionStatus}</p>
                </article>
                <h1>${spiderDetails.name}</h1>
                <article class="rescue-story">
                    <h2 class="spider-info-header">Rescue Story:</h2>
                    <p class="spider-info-text">${spiderDetails.story}</p>
                </article>
                <article class="info-row-container">
                    <article class="info-field">
                        <h2 class="spider-info-header">Experience Level:</h2>
                        <p class="spider-info-text">${spiderDetails.speciesExperience}</p>
                    </article>
                    <article class="info-field">
                        <h2 class="spider-info-header">Habitat:</h2>
                        <p class="spider-info-text">${spiderDetails.habitat}</p>
                    </article>
                </article>
                <article class="info-row-container">
                    <article class="info-field">
                        <h2 class="spider-info-header">Temperament:</h2>
                        <p class="spider-info-text">${spiderDetails.temprement}</p>
                    </article>
                    <article class="info-field">
                        <h2 class="spider-info-header">Food:</h2>
                        <p class="spider-info-text">${spiderDetails.food}</p>
                    </article>
                </article>
                <article class="info-squares-container">
                    <article class="info-square">
                        <h2 class="spider-info-header text-center">Species:</h2>
                        <p class="spider-info-text text-center">${spiderDetails.SpeciesName}</p>
                    </article>
                    <article class="info-square">
                        <h2 class="spider-info-header text-center">Age:</h2>
                        <p class="spider-info-text text-center">${spiderDetails.age}</p>
                    </article>
                    <article class="info-square">
                        <h2 class="spider-info-header text-center">Sex:</h2>
                        <p class="spider-info-text text-center">${spiderDetails.gender}</p>
                    </article>
                    <article class="info-square">
                        <h2 class="spider-info-header text-center">Health:</h2>
                        <p class="spider-info-text text-center">${spiderDetails.heatlh}</p>
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

  const statusPill = document.querySelector(".status-pill--text");
  const adoptionStatus = spiderDetails.adoptionStatus;
  statusPill.classList.add(`status-${adoptionStatus.toLowerCase()}`);
  const adopted = document.querySelector(".button");
  if (adoptionStatus === "adopted") {
    console.log('adopted');
    adopted.classList.add("button--disabled");
  }

  enableRouting("a");

  const button = document.getElementById("adoptMeButton");
  button.addEventListener("click", async (event) => {
    if (adoptionStatus !== "adopted") {
      event.preventDefault();
      navigate(`adoption/?id=${id}`);
    }
  });
}
