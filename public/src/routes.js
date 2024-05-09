import { BasePage } from "./pages/Base/BasePage.js";
import { HomePage } from "./pages/Home/HomePage.js";
import { LoginPage } from "./pages/Login/LoginPage.js";
import { ContactPage } from "./pages/Contact/ContactPage.js";
import { ProfilePage } from "./pages/Profile/Profile.js";
import { SpiderList } from "./pages/SpiderList/SpiderListPage.js";
import { LogoutPage } from "./pages/Logout/LogoutPage.js";

export const routes = {
    '': BasePage,
    'home': HomePage,
    'login': LoginPage,
    'contact': ContactPage,
    'profile': ProfilePage,
    'spiderlist' : SpiderList,
    'logout' : LogoutPage,
}