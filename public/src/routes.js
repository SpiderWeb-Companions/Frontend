import { BasePage } from "./pages/Base/BasePage.js";
import { HomePage } from "./pages/Home/HomePage.js";
import { LoginPage } from "./pages/Login/LoginPage.js";
import { ContactPage } from "./pages/Contact/ContactPage.js";
import { SpiderList } from "./pages/SpiderList/SpiderListPage.js";

export const routes = {
    '': BasePage,
    'home': HomePage,
    'login': LoginPage,
    'contact': ContactPage,
    'spiderlist' : SpiderList,
}