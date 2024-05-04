import { navigate } from "../_routing/start.js";
import { WebComponent } from "../_wrappers/WebComponent.js";
import { css } from "../_wrappers/css.js";

export class NavBar extends WebComponent {
  identifier = "nav-bar";
  constructor() {
    super();
  }
  // css is not very responsive let - will fix later when I finish the component
  static css = css`
    header {
      display: flex;
      flex-direction: row;
      width: 100vw;
      height: 10vh;
      color: #ffff;
      justify-content: center;
      padding: 2vh;
    }
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      font-weight: bold;
      font-family: "DM Sans", sans-serif;
      width: 8vw;
      height: 10vh;
      color: #ffaebc;
      margin: 0;
    }
    nav {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80vw;
      height: 10vh;
    }
    ul {
      display: flex;
      gap: 2vw;
      align-items: center;
      width: 50vw;
      height: 10vh;
      margin: 0;
      padding: 0;
    }
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.8rem;
      font-weight: bold;
      font-family: "DM Sans", sans-serif;
      color: #000000;
      list-style: none;
    }
    li:hover {
      color: #ffaebc;
    }
    ul li a {
      text-decoration: none;
      color: inherit;
    }
    .active {
    }
    button {
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
    button:hover {
      cursor: pointer;
    }
    .logout {
    }
    .back {
    }
  `;
  // is there a way to determine the current url/page we are on ?
  static properties = {};
  render() {
    return `
            <header>
                <img class="logo" src="/assets/logo.svg" alt="Logo">
                <h1>SpiderWeb Companions</h1>
                <nav>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/home">Browse</a></li>
                        <li><a href="/home">My Profile</a></li>
                        <li><a href="/home">Contact Us</a></li>
                    </ul>
                    <button class="logout">Logout</button>
                </nav>
            </header>
        `;
  }
}

customElements.define("nav-bar", NavBar);
