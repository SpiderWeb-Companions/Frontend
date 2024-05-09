import { html } from "../../_wrappers/html.js";
import { enableRouting } from "../../_routing/start.js";
import { SpiderCard } from "../../components/SpiderCard.js";
import {
  getSpiders,
  getAdoptionStatuses,
  getSpecies
} from "../../services/spiders.js";

export async function SpiderListPage(queryString) {
  let search = "",
    species = "",
    status = "";
  let spiderArray = await getSpiders(8, 1, search, species, status);
  const speciesArray = await getSpecies();
  const statusArray = await getAdoptionStatuses();

  async function populateSpiders() {
    spiderArray = await getSpiders(8, 1, search, species, status);
    const spiders = document.getElementById("spiders-container");
    spiders.innerHTML = "";
    spiderArray.forEach(function (spider, index, array) {
      spiders.appendChild(
        new DOMParser().parseFromString(
          `<spider-card 
                    adoption-status="${spider.adoptionStatus}"  
                    spider-name="${spider.name}" 
                    species="${spider.species}"  
                    photo="${spider.photo}"
                    spider="${spider.id}"
                    ></spider-card>`,
          "text/html"
        ).body.firstChild
      );
    });
  }

  const css = `
    <style>
        main {
          font-family: "DM Sans", sans-serif;
          height: 86vh;
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;
          width: 100vw;
          overflow: hidden;
        } 

        .spiders-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin: 0;
            height: fit-content;
            overflow-y: auto;
            gap: 2vw; 
            padding: 2vh;
        }

        .filter-container {
            padding-left: 5vw;
            flex-direction: row;
            color: #898989;
            font-size: 0.9em;
            display: flex;
            flex-wrap: wrap;
            align-items: stretch;
            gap: 1vw;
        }

        .filter-container section {
            padding: 0 0.5em;
        }

        .filter-container section select {
            width: 15em;
        }

        .filter-container section input {
            width: 18em;
        }

        .card-filter {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
        }

        .filter-label {
            position: relative;
            color: #898989;
            margin: 0 0 -0.65em 3em;
            background-color: #fff;
            width: max-content;
            font-weight: 500;
        }

        .filter-control {
            padding: 1em;
            width: 100%;
            color: #898989;
            border: 0.05em solid #ccc;
            border-radius: 1em;
            font-size: 1em;
        }

        .search {
            padding-left: 2.75em;
            background-image: url(../../../assets/search.svg);
            background-size:auto;
            background-repeat: no-repeat;
            background-position: 0.75em center;  
        }
        
        p {
            font-size: 1em;
        }
        
        h2 {
            font-size: 1.5em;
        }

    </style>`;

  const html = `
    <main id="main">
        <form id="card-filters" class="filter-container">
            <section class="card-filter">
                <label class="filter-label">Name</label>
                <input id="search" name="search" type="text" placeholder="Search" class="search filter-control">
            </section>
            <section class="card-filter">
                <label class="filter-label">Species</label>
                <select id="species" name="species" class="filter-control">
                    <option value="" selected>Any</option>
                    ${speciesArray
                      .map((species) => {
                        return `<option value="${species.SpeciesName}">${species.SpeciesName}</option>`;
                      })
                      .join("")}
                </select>
            </section>
            <section class="card-filter">
                <label class="filter-label">Adoption Status</label>
                <select id="status" name="adoption-status" class="filter-control">
                    <option value="" selected>Any</option>
                    ${statusArray
                      .map((status) => {
                        const word = status.status;
                        const adoptionStatus =
                          word.charAt(0).toUpperCase() + word.slice(1);
                        return `<option value="${status.status}">${adoptionStatus}</option>`;
                      })
                      .join("")}
                </select>
            </section>
        </form>  
        <section id="spiders-container" class="spiders-container">
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
        </section>
    </main>`;

  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(
    new DOMParser().parseFromString(html, "text/html").body.firstChild
  );
  app.appendChild(
    new DOMParser().parseFromString(css, "text/html").head.firstChild
  );

  const speciesElement = document.getElementById("species");
  const statusElement = document.getElementById("status");

  speciesElement.addEventListener(
    "change",
    function () {
      species = document.getElementById("species").value;
      populateSpiders();
    },
    false
  );

  statusElement.addEventListener(
    "change",
    function () {
      status = document.getElementById("status").value;
      populateSpiders();
    },
    false
  );

  enableRouting("a");
}
