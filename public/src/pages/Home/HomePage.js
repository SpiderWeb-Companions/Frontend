import { enableRouting } from "../../_routing/start.js";
import { NavBar } from "../../components/NavBar.js";

export function HomePage(queryString) {
  const app = document.getElementById("app");

  app.innerHTML = `
    <nav-bar></nav-bar>
    `;
  enableRouting("a");
}
