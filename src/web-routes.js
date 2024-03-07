import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { serverController } from "./controllers/server-controller.js";
import { serviceController } from "./controllers/service-controller.js";
import { archiveController } from "./controllers/archive-controller.js";
import { dependencyController } from "./controllers/dependency-controller.js";
import { userController } from "./controllers/user-controller.js";

export const webRoutes = [
  // serve static files in public folder
  { method: "GET", path: "/public/{param*}", handler: { directory: { path: "public" } } },
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

  // routes
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dependency", config: dependencyController.index },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/user-account", config: accountsController.loggedInUserDetails },
  { method: "GET", path: "/users", config: userController.index },
  { method: "POST", path: "/updateUserDetails", config: accountsController.updateLoggedInUser },
  { method: "GET", path: "/user-account/confirmDeleteUserAccount", config: accountsController.confirmDelete },
  { method: "POST", path: "/user-account/deleteUserAccount", config: accountsController.deleteUserAccount },

  { method: "GET", path: "/archive", config: archiveController.index },
  { method: "POST", path: "/archive/deleteserver/{id}", config: archiveController.deleteServer },
  { method: "GET", path: "/archive/confirmdelete/{id}", config: archiveController.confirmDelete },
  { method: "GET", path: "/archive/confirmdelete/recommissionserver/{id}", config: archiveController.recomissionServer },
  { method: "GET", path: "/archive/recommissionserver/{id}", config: archiveController.confirmRestore },
  { method: "GET", path: "/archive/{id}/editserver", config: archiveController.showServerDetails },
  { method: "POST", path: "/archive/{id}/updateserver", config: archiveController.update },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addserver", config: dashboardController.addServer },
  { method: "GET", path: "/dashboard/confirmdelete/{id}", config: dashboardController.confirmDelete },
  { method: "POST", path: "/dashboard/deleteserver/{id}", config: dashboardController.deleteServer },
  { method: "GET", path: "/dashboard/searchserver", config: dashboardController.searchServer },
  { method: "GET", path: "/dashboard/filterserver", config: dashboardController.filterServer },
  { method: "GET", path: "/dashboard/easyfilterserver", config: dashboardController.easySortServer },
  { method: "GET", path: "/dashboard/confirmdelete/decommissionserver/{id}", config: dashboardController.decomissionServer },

  { method: "GET", path: "/server/{id}/editserver", config: serverController.showServerDetails },
  { method: "POST", path: "/server/{id}/updateserver", config: serverController.update },

  { method: "GET", path: "/server/{id}/editservercost", config: serverController.showMaintenanceCostDetails },
  { method: "POST", path: "/server/{id}/updateservercost", config: serverController.updateCost },

  { method: "GET", path: "/server/{id}/editservermaas", config: serverController.showMaas },
  { method: "POST", path: "/server/{id}/updateservermaas", config: serverController.updateMaas },

  { method: "GET", path: "/server/{id}", config: serverController.index },
  { method: "POST", path: "/server/{id}/addservice", config: serverController.addService },
  { method: "GET", path: "/server/{id}/deleteservice/{serviceid}", config: serverController.deleteService },
  { method: "GET", path: "/server/{id}/searchservice", config: serverController.searchService },

  { method: "POST", path: "/service/{id}/updateservice/{serviceid}", config: serviceController.update },
  { method: "GET", path: "/service/{id}/editservice/{serviceid}", config: serviceController.index },
];
