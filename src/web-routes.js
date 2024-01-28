import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { serverController } from "./controllers/server-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addserver", config: dashboardController.addServer },
  { method: "GET", path: "/dashboard/deleteserver/{id}", config: dashboardController.deleteServer },

  { method: "GET", path: "/server/{id}", config: serverController.index },
  { method: "POST", path: "/server/{id}/addservice", config: serverController.addService },
];
