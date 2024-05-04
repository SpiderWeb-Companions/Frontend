import { BasePage } from "./pages/Base/BasePage.js";
import { HomePage } from "./pages/Home/HomePage.js";
import { LoginPage } from "./pages/Login/LoginPage.js";

export const routes = {
    '': BasePage,
    'home': HomePage,
    'login': LoginPage,
}