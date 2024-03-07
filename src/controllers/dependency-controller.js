import { db } from "../models/db.js";

export const dependencyController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const loggedInUserInitials = loggedInUser.firstName[0] + loggedInUser.lastName[0];
      const date = new Date().getFullYear();
      const servers = await db.serverStore.getAllServers();
      const services = await db.serviceStore.getAllServices();
      const company = "[Company name]";
      const viewData = {
        title: "Dependency Tree",
        date,
        company,
        loggedInUserInitials,
        servers: servers,
        services,
      };
      return h.view("dependency-view", viewData);
    },
  },
};
