import { enableRouting, navigate } from "../../_routing/start.js";
import { isAuthenticated } from "../../_authentication/Authentication.js";
import { getSpiderDetails } from "../../services/spiderProfile.js";
import { submitAdoptionForm } from "../../services/adoption.js";

export async function SpiderAdoption(queryString) {
    let spiderDetails = '';
    let id ;
   // const user = await getUserDetails();
    // const email = user.email;
    // const name = user.name;
    // const profilePic = user.picture;

        const email = 'placeholder@gmail.com';
    const name = 'John Doe';
    const profilePic = 'https://via.placeholder.com/150';

    if (queryString) {
      const params = new URLSearchParams(queryString);
      id = params.get('id')
      spiderDetails = await getSpiderDetails(id);
    }
  
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
            gap: 2vh;
          }
          .spider-pic {
              min-width: 40%;
              max-width: 70%;
              min-height: 50%;
              padding: 2vh'
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
          .adoption-form-section {
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
        .submit-button{
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
        .error-label{
            color:  #AA4A44
        }
          </style>
      `;
    const html = `
          <main>
          <section class='spider-details-and-pic'>
            <section class="spider-picture-section">
            <img class="spider-pic" src="${spiderDetails.photo}" alt="Spider Picture">
            </section>
          
              <section class="spider-information-section">
             
                  <p class="status-pill"></p>
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
                          <h2 class="spider-info-header">Species:</h2>
                          <p class="spider-info-text">${spiderDetails.SpeciesName}</p>
                      </article>
                      <article class="info-square">
                          <h2 class="spider-info-header">Age:</h2>
                          <p class="spider-info-text">${spiderDetails.age}</p>
                      </article>
                      <article class="info-square">
                          <h2 class="spider-info-header">Sex:</h2>
                          <p class="spider-info-text">${spiderDetails.gender}</p>
                      </article>
                      <article class="info-square">
                          <h2 class="spider-info-header">Health:</h2>
                          <p class="spider-info-text">${spiderDetails.heatlh}</p>
                      </article>
                  </article>
                </section>
              </section>
              <section class="adoption-form-section">
                <form>
                    <section class="card-filter">
                        <label class="filter-label" >First name</label>
                        <input class="filter-control" type="text" id="first-name" value=${name.split(" ")[0]}>
                        <label class="error-label" for="first-name" ></label>
                    </section>
                    <section class="card-filter">
                        <label class="filter-label">Last name</label>
                        <input class="filter-control" type="text" id="last-name" value=${name.split(" ")[1]} >
                        <label class="error-label" for="last-name" ></label>
                    </section>
                    <section class="card-filter">
                        <label class="filter-label">Email Address</label>
                        <input class="filter-control" type="text" id="email-address" value=${email} readonly>
                        <label class="error-label" for="email-address" ></label>
                    </section>
                    <section class="card-filter">
                        <label class="filter-label">Address</label>
                        <input class="filter-control" type="text" id="address" >
                        <label class="error-label" for="address" ></label>
                    </section>
                    <section class="card-filter">
                        <label class="filter-label">Spider Care Experience</label>
                        <input class="filter-control" type="text" id="experience" >
                        <label class="error-label" for="experience" ></label>
                    </section>
                    <section class="card-filter">
                        <label class="filter-label">Adoption Reason</label>
                        <input class="filter-control" type="text" id="reason" >
                        <label class="error-label" for="reason" ></label>
                    </section>
                    <section class="card-filter">
                        <label class="filter-label">Comments</label>
                        <input class="filter-control" type="text" id="comments" >
                    </section>

                </form>

                <button id="submit-button">Submit</button>

                <p id="feedback"> </p>

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
        console.log(event)
        const label = event.srcElement.labels[0];

        if (event.srcElement.value.length <1){
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
      let response = submitAdoptionForm(email, reason.value, comments.value, id)
      provideFeedback(response);
    });

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
  