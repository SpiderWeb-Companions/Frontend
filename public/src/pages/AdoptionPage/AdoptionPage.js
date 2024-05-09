import { enableRouting, navigate } from "../../_routing/start.js";
import { isAuthenticated, getUserDetails } from "../../_authentication/Authentication.js";
import { getSpiderDetails } from "../../services/spiderProfile.js";
import { submitAdoptionForm } from "../../services/adoption.js";

export async function SpiderAdoption(queryString) {
    let spiderDetails = '';
    let id;
    const user = await getUserDetails();
    let email = user.email;
    let name = user.name;
    console.log(email, " ", name)

    if (queryString) {
      const params = new URLSearchParams(queryString);
      id = params.get('id');
      console.log("id at start: ", id);
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
              height: 86vh;
              width: 100vw;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              gap: 5vw;
            }
            .spider-details-and-pic {
              display: flex;
              width: 40vw;
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
            button:hover {
              cursor: pointer;
            }
          .spider-information-section-a {
             height: 70vh;
             width: 30vw;
             min-width: 22.5rem;
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
          .spider-info-header-a {
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: 600;
            font-family: "DM Sans", sans-serif;
            margin: 0;
            width: 100%;
          }
          .spider-info-text-a {
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
            font-size: 0.6rem;
            font-weight: 400;
            font-family: "DM Sans", sans-serif;
            margin: 0;
          }
          .info-row-container-a {
            display: flex;
            justify-content: center;
            gap: 3vw;
            width: 100%;
          }
          .info-field {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 2vh;
            gap: 1vh;
          }
          .info-squares-container-a {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
          .info-square-a {
            display: flex;
            flex-direction: column;
            padding: 2vh;
            width: 10vw;
            height: 7vh;
            gap: 1vh;
            background-color: #FFAEBC;
            border-radius: 25px;
          }
          .adoption-form-section {
            width: 30vw;
            min-width: 22.5rem;
            height: 70vh;
            background-color: #FFFFFF;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            gap: 2vh;
            align-items: center;
            justify-content: center;
            padding: 2vh;
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
        .filter-label {
            position: relative;
            color: #898989;
            margin: 0 0 -0.65em 3em;
            background-color: #fff;
            width: max-content;
            font-weight: 500;
        }
        
        .card-filter {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
        }
        .submit-button {
            width: 12vw;
            height: 6vh;
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
        .error-label {
            display: flex;
            justify-content: center;
            align-items: center;
            color:  #AA4A44
            font-size: 0.8rem;
            font-weight: 400;
            font-family: "DM Sans", sans-serif;
        }
          </style>
      `;
    const html = `
        <main>
          <section class="spider-information-section-a">
            <article class="status-pill">
              <p class="status-pill--text">${spiderDetails.adoptionStatus}</p>
            </article>
            <h1>${spiderDetails.name}</h1>
            <article class="info-row-container-a">
              <article class="info-square-a">
                <h2 class="spider-info-header-a">Experience Level:</h2>
                <p class="spider-info-text-a">${spiderDetails.speciesExperience}</p>
              </article>
              <article class="info-square-a">
                <h2 class="spider-info-header-a">Habitat:</h2>
                <p class="spider-info-text-a">${spiderDetails.habitat}</p>
              </article>
            </article>
            <article class="info-row-container-a">
              <article class="info-square-a"">
                <h2 class="spider-info-header-a">Temperament:</h2>
                <p class="spider-info-text-a">${spiderDetails.temprement}</p>
              </article>
              <article class="info-square-a"">
                <h2 class="spider-info-header-a">Food:</h2>
                <p class="spider-info-text-a">${spiderDetails.food}</p>
              </article>
            </article>
            <article class="info-row-container-a">
              <article class="info-square-a"">
                <h2 class="spider-info-header-a">Species:</h2>
                <p class="spider-info-text-a">${spiderDetails.speciesName}</p>
              </article>
              <article class="info-square-a"">
                <h2 class="spider-info-header-a">Age:</h2>
                <p class="spider-info-text-a">${spiderDetails.age}</p>
              </article>
            </article>
            <article class="info-row-container-a">
              <article class="info-square-a"">
                <h2 class="spider-info-header-a">Sex:</h2>
                <p class="spider-info-text-a">${spiderDetails.gender}</p>
              </article>
              <article class="info-square-a"">
                <h2 class="spider-info-header-a">Health:</h2>
                <p class="spider-info-text-a">${spiderDetails.heatlh}</p>
              </article>
            </article>
          </section>
          <form class="adoption-form-section">
            <section class="card-filter">
              <label class="filter-label">First name</label>
              <input class="filter-control" type="text" id="first-name" value="${name}">
              <label class="error-label" for="first-name"></label>
            </section>
            <section class="card-filter">
              <label class="filter-label">Email Address</label>
              <input class="filter-control" type="text" id="email-address" value="${email}">
              <label class="error-label" for="email-address"></label>
            </section>
            <section class="card-filter">
              <label class="filter-label">Address</label>
              <input class="filter-control" type="text" id="address">
              <label class="error-label" for="address"></label>
            </section>
            <section class="card-filter">
              <label class="filter-label">Spider Care Experience</label>
              <input class="filter-control" type="text" id="experience">
              <label class="error-label" for="experience"></label>
            </section>
            <section class="card-filter">
              <label class="filter-label">Adoption Reason</label>
              <input class="filter-control" type="text" id="reason">
              <label class="error-label" for="reason"></label>
            </section>
            <section class="card-filter">
              <label class="filter-label">Comments</label>
              <input class="filter-control" type="text" id="comments">
            </section>
            <button id="submit-button">Submit</button>
            <p class="error-label" id="feedback"></p>
          </form>
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

    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const reason = document.getElementById("reason");
    const address=  document.getElementById("address");
    const experience=  document.getElementById("experience");
    const comments=  document.getElementById("comments");

    let fieldsAreValid = {
        "first-name": true,
        "last-name": true,
        "reason": false,
        "address": false,
        "experience": false,
        "comments": false,
    };

    const validate = (event) => {
        const label = event.srcElement.labels[0];
        if (event.srcElement.value.length <1) {
        label.innerHTML ="This field is required"
        fieldsAreValid[event.srcElement.id] =false;
        } else if (event.srcElement.value.length>250){
            label.innerHTML ="This field has a max length of 250 characters"
            fieldsAreValid[event.srcElement.id] =false;
        }
        fieldsAreValid[event.srcElement.id] =true;

    }

    firstName.addEventListener("change", async (event) => {
        validate(event)
      });
  



    const button = document.getElementById("submit-button");
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      email = "adrianhawkins02@gmail.com";
      console.log('form info: ', email, reason.value, comments.value, "id: ", id)
      let response = submitAdoptionForm(email, reason.value, comments.value, id)
      provideFeedback(response);
    });

    const statusPill = document.querySelector(".status-pill--text");
    const adoptionStatus = spiderDetails.adoptionStatus;
    statusPill.classList.add(`status-${adoptionStatus.toLowerCase()}`);

    const provideFeedback = (response)=>{
        let feedback=  document.getElementById("feedback");
        feedback.innerHTML="";
        let htmlFeedback ="";
        if (response.status == 200)
        {
            htmlFeedback = "Success"            
        }
        else{
            htmlFeedback = "Failure"
        }
        feedback.appendChild(
            new DOMParser().parseFromString(htmlFeedback, "text/html").body.firstChild
          );
    }
  }
  