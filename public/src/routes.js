import { BasePage } from "./pages/BasePage.js";
import { HomePage } from "./pages/HomePage.js";
import { LoginPage } from "./pages/LoginPage.js";

export const routes = {
    '': new BasePage(),
    'home': new HomePage(),
    'login': new LoginPage(),
}