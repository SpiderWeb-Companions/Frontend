import { BasePage } from "./pages/Base/BasePage.js";
import { HomePage } from "./pages/Home/HomePage.js";
import { LoginPage } from "./pages/Login/LoginPage.js";
import { ContactPage } from "./pages/Contact/ContactPage.js";
import { ProfilePage } from "./pages/Profile/Profile.js";
import { SpiderListPage } from "./pages/SpiderList/SpiderListPage.js";
import { SpiderProfile } from "./pages/SpiderProfile/SpiderProfile.js";
import { SpiderAdoption } from "./pages/AdoptionPage/AdoptionPage.js";
import { LogoutPage } from "./pages/Logout/LogoutPage.js";

export const routes = {
  "": HomePage,
  home: HomePage,
  login: LoginPage,
  contact: ContactPage,
  profile: ProfilePage,
  spiderprofile: SpiderProfile,
  browse: SpiderListPage,
  adoption: SpiderAdoption,
  logout: LogoutPage,
};
