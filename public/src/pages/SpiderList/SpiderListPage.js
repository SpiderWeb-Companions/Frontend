import { html } from "../../_wrappers/html.js";
import { enableRouting } from "../../_routing/start.js";
import { SpiderCard } from "../../components/SpiderCard.js";
import { getSpiders, getAdoptionStatuses, getSpecies } from "../../services/spiders.js";

export async function SpiderListPage(queryString) {
    const spiderArray = await getSpiders(0);
    const speciesArray = await getSpecies();
    const statusArray = await getAdoptionStatuses();

    const app = document.getElementById('app'); 

    const css = `
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
    </style>`
     
    app.innerHTML = `${css}
    <main id="main" class="flex-container">
        <form id="card-filters" class="flex-container">
            <section class="flex-item">
                <label class="flex-container filter-label">Name</label>
                <input id = "search" name = "search" type="text" placeholder="Search" class="filter-control">
            </section>
            <section class="flex-item">
                <label class="flex-container filter-label">Age</label>
                <select name="age" id="age" class="filter-control"></select>
            </section>
            <section class="flex-item">
                <label class="flex-container filter-label">Species</label>
                <select name="species" id="species" class="filter-control">
                    <option value="any" selected>Any</option>
                    ${speciesArray.map(species => {
                        return `<option value="${species.SpeciesName}">${species.SpeciesName}</option>`;
                    }).join('')}
                </select>
            </section>
            <section class="flex-item">
                <label class="flex-container filter-label">Adoption Status</label>
                <select name="adoption-status" id="adoption-status" class="filter-control">
                    <option value="any" selected>Any</option>
                    ${statusArray.map(status => {
                        const word = status.status;
                        const adoptionStatus = word.charAt(0).toUpperCase() + word.slice(1);
                        return `<option value="${adoptionStatus}">${adoptionStatus}</option>`;
                    }).join('')}
                </select>
            </section>
        </form>  

        <section class="flex-container">
            <section id="card-holder" class=" flex-container">
                ${spiderArray.map(spider => {
                    return `<spider-card 
                            adoption-status="${spider.adoptionStatus}"  
                            spider-name="${spider.name}" 
                            species="${spider.species}"  
                            photo="${spider.photo}"
                            ></spider-card>`
                }).join('')}
            </section>
        </section>
    </main>`

    
    enableRouting('a')
}