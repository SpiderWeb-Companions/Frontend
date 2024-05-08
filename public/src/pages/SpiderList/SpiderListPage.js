import { html } from "../../_wrappers/html.js";
import { enableRouting } from "../../_routing/start.js";

export async function SpiderList(queryString) {
  const documentStyles = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "DM Sans", sans-serif;
            font-size: 1em;
        }
        
        body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 1em;
        }

        main {
            height: 100%;
            padding: 0 10%
        }
        
        .flex-container {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-items: stretch;
            width: 100%;
        }
        
        #card-holder {
            margin: 3em 0;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(
                auto-fill,
                minmax(15.5em, 1fr)
            );
            grid-gap: 2em;
        }

        #card-filters {
            flex-direction: row;
            color: #898989;
            font-size: 0.9em;
        }

        #card-filters section {
            padding: 0 0.5em;
        }

        #card-filters section select {
            width: 15em;
        }

        #card-filters section input {
            width: 20em;
        }
        
        p {
            font-size: 1em;
        }
        
        h2 {
            font-size: 1.5em;
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
        }

        #search {
            padding-left: 2.75em;
            background-image: url(magnifying-glass.svg);
            background-size:auto;
            background-repeat: no-repeat;
            background-position: 0.75em center;  
        }

        .card-class {
            border: 0.05em solid #ccc;
            margin: 0.5em;
            border-radius: 1em;
            width: 100%;
            text-align: center;
            transition: transform 0.1s ease-in-out;
            box-shadow: 0em 0.2em 0.2em
                rgba(0, 0, 0, 0.3);
        }

        .card-class:hover {
            transform: scale(1.1);
        }
    </style>`;

  const app = document.getElementById("app");
  app.innerHTML = html`${documentStyles}
    <main id="main" class="flex-container">
      <form id="card-filters" class="flex-container">
        <section class="flex-item">
          <label class="flex-container filter-label">Name</label>
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search"
            class="filter-control"
          />
        </section>
        <section class="flex-item">
          <label class="flex-container filter-label">Age</label>
          <select name="age" id="age" class="filter-control"></select>
        </section>
        <section class="flex-item">
          <label class="flex-container filter-label">Species</label>
          <select name="species" id="species" class="filter-control"></select>
        </section>
        <section class="flex-item">
          <label class="flex-container filter-label">Adoption Status</label>
          <select
            name="adoption-status"
            id="adoption-status"
            class="filter-control"
          ></select>
        </section>
      </form>

      <section class="flex-container">
        <section id="card-holder" class=" flex-container"></section>
      </section>
    </main>`;

  const status_filter = document.getElementById("adoption-status");
  fetch("http://52.30.87.179/api/status")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      status_filter.innerHTML =
        `<option value="any" selected>Any</option>` +
        data
          .map((item) => {
            var word = item.status;
            const status = word.charAt(0).toUpperCase() + word.slice(1);
            return `<option value="${item.status}">${status}</option>`;
          })
          .join("");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  const species_filter = document.getElementById("species");
  fetch("http://52.30.87.179/api/species")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      species_filter.innerHTML =
        `<option value="any" selected>Any</option>` +
        data
          .map((item) => {
            return `<option value="${item.SpeciesName}">${item.SpeciesName}</option>`;
          })
          .join("");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ limit: 3 }),
  };

  const card_holder = document.getElementById("card-holder");

  fetch("http://52.30.87.179/api/all/spiders", requestOptions)
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the JSON response
      return response.json();
    })
    .then((data) => {
      card_holder.innerHTML = data
        .map((item) => {
          const adoptionStatus =
            item.adoptionStatus.charAt(0).toUpperCase() +
            item.adoptionStatus.slice(1);
          return `<spider-card class="card-class" spiderId="${item.id}" spider-name="${item.name}" species="${item.species}" photo="${item.photo}" adoption-status="${adoptionStatus}"></spider-card>`;
        })
        .join("");
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("There was a problem with the fetch operation:", error);
    });
}
