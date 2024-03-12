import { db } from "../models/db.js";
import { analytics } from "../utils/analytics.js";
import { serviceJsonStore } from "../models/json/service-json-store.js";

export const dependencyController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const loggedInUserInitials = loggedInUser.firstName[0] + loggedInUser.lastName[0];
      const date = new Date().getFullYear();
      // test of dependencies
      const b = [];
      const servers = await db.serverStore.getAllServers();
      for (let i = 0; i < servers.length; i++) {
        const a = servers[i]._id;
        const server = await db.serverStore.getServerById(a);
        b.push(server);
      }

      // console.log("Services: " + b);
      // console.log("Server: " + JSON.stringify(server));

      const company = "[Company name]";
      const viewData = {
        title: "Dependency Tree",
        date,
        company,
        loggedInUserInitials,
        servers: servers,
        b,
      };
      return h.view("dependency-view", viewData);
    },
  },
};
