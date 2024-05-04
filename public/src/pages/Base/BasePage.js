import { enableRouting } from "../../_routing/start.js";

export function BasePage(queryString) {


    const app = document.getElementById('app');

    app.innerHTML = `
    <h1>SpiderWeb Companions</h1>
    <a href="home">Home</a>
    <a href="login">Login</a>
    
`
enableRouting('a');
}