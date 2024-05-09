import { enableRouting } from "../../_routing/start.js";
import {
    getSpiders,
    getAdoptionStatuses,
    getSpecies,
    getSpiderCount,
} from "../../services/spiders.js";

export async function SpiderListPage(queryString) {
    const result_limit = 5;
    let search = "",
        species = "",
        status = "",
        current_page = 0;
    let spiderArray = await getSpiders(result_limit, current_page, search, species, status);
    let spiderCount = await getSpiderCount(search, species, status);
    let pages = Math.max(1,Math.ceil(spiderCount/result_limit));
    const speciesArray = await getSpecies();
    const statusArray = await getAdoptionStatuses();

    async function populateSpiders() {
        spiderArray = await getSpiders(result_limit, current_page, search, species, status);
        const spiders = document.getElementById("spiders-container");
        spiders.innerHTML = "";
        if (spiderArray.length > 0) {
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
        else {
            spiders.appendChild(
                new DOMParser().parseFromString(
                `<h3 class="warning-message">No spiders match your search!</h3>`,
                "text/html"
                ).body.firstChild
            );
        }
        
    }

    async function populatePagination() {
        current_page = 0;
        spiderCount = await getSpiderCount(search, species, status);
        pages = Math.max(1,Math.ceil(spiderCount/result_limit));
        const pagination = document.getElementById("pagination-container");
        pagination.innerHTML = "";
        [...Array(pages).keys()].forEach(function (page, index, array) {
            pagination.appendChild(
                new DOMParser().parseFromString(
                    `<label>
                        <input value="${page}" name="pagination-control" id="page-${page}" type="radio" ${(page == 0) ? "checked=\"\"":""}>
                        <span>${page + 1}</span>
                    </label>`,
                "text/html"
                ).body.firstChild
            );
            const pageElement = document.getElementById("page-"+page);
            pageElement.addEventListener(
                "change",
                async () => {
                    let new_page = parseInt(pageElement.value);
                    if (current_page != new_page) {
                        current_page = new_page;
                        await populateSpiders();
                    }
                },
                false
            );
        });
    }

    const css = `
        <style>
            main {
                font-family: "DM Sans", sans-serif;
                min-height: 90vh;
                max-height: 90vh;
                height: 100%;
                display: flex;
                flex-direction: column;
                margin: 0;
                padding: 0;
                overflow: hidden;
                flex-wrap: wrap;
                align-items: stretch;
                width: 100%;
            } 

            .spiders {
                height: 100%;
                max-height: 80vh;
                min-height: 80vh;
                width: 100vw;
                display: flex;
                flex-direction: column;
            }
            
            .spiders-wrapper {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }

            .spiders-container {
                display: flex;
                justify-content: space-evenly;
                flex-wrap: wrap;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                max-height: 100%;
                overflow-y: auto;
                gap: 1rem; 
            }

            .filter-container {
                padding-left: 5vw;
                flex-direction: row;
                color: #898989;
                font-size: 0.9em;
                height: 100%;
                max-height: 10vh;
                min-height: 10vh;
                display: flex;
                flex-wrap: wrap;
                align-items: stretch;
                width: 100%;
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
                outline: none;
            }

            .search {
                padding: 1em; 
                font-size: 1em;
                border:none;
                outline: none;
                background-color: transparent;
            }

            .search-container {
                display: flex;
                align-items: center;
                padding-right: 0;
            }

            .search-control {
                border:none;
                outline: none;
                background-color: transparent;
                height: 100%
                transition-duration: 0.3s;
            }

            .search-control:hover {
                background-color: #d3d3d3;
                transition-duration: 0.3s;
            }

            .pagination {
                display: flex;
                justify-content: center;
            }

            .pagination-container input {
                display: none;
            }

            .pagination-container {
                position: relative;
                display: flex;
                align-items: center;
                justify-self: center;
                border-radius: 1em;
                background-color: #fff;
                color: #898989;
                width:fit-content;
                overflow: hidden;
                border: 0.05em solid #ccc;
            }

            .pagination-container label {
                width: 4em;
                padding: 0.8em;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1;
                font-weight: 500;
                font-size: 1em;
            }

            .pagination-container label:has(input:checked) {
                color: #15524d;
                background-color: #a7ebe5;
            }

            .warning-message {
                color: #898989;
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
                    <label for="search" class="filter-label">Name</label>
                    <section class="search-container filter-control">
                        <input id="search" name="search" type="text" placeholder="Search" class="search">
                        <button id="reset-button" class="search-control reset-button" type="reset">
                            x
                        </button>
                        <button id="search-button" class="search-control search-button" type="submit">
                            <img src="../../../assets/search.svg" />
                        </button>
                    </section>
                </section>
                <section class="card-filter">
                    <label for="species" class="filter-label">Species</label>
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
                    <label for="status" class="filter-label">Adoption Status</label>
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

            <section class="spiders">
                <section class="spiders-wrapper">
                    <section id="spiders-container" class="spiders-container">
                    </section>
                </section>

                <section class="pagination">
                        <section id="pagination-container" class="pagination-container">  
    
                        </section>
                    </section>
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
        async () => {
            current_page = 0;
            species = document.getElementById("species").value;
            await populateSpiders();
            await populatePagination();
        },
        false
    );

    statusElement.addEventListener(
        "change",
        async () =>  {
            current_page = 0;
            status = document.getElementById("status").value;
            await populateSpiders();
            await populatePagination();
        },
        false
    );

    const form = document.getElementById("card-filters");
    form.addEventListener(
        'submit', 
        async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const formValues = Object.fromEntries(formData.entries());
            if (search != formValues.search) {
                search = formValues.search;
                await populatePagination();
                await populateSpiders();
            }     
        }
    );

    form.addEventListener(
        'reset', 
        async (event) => {
            event.preventDefault();
            const searchField = document.getElementById("search");
            searchField.value = "";
            if (search != "") {
                search = "";
                await populatePagination();
                await populateSpiders();
            } 
        }
    );

    await populatePagination();
    await populateSpiders();

    enableRouting("a");
}
