import { BasePage } from "./pages/BasePage.js";
import { HomePage } from "./pages/HomePage.js";

export const routes = {
    '': new BasePage(),
    'home': new HomePage(),
}