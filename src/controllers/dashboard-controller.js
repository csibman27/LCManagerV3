import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const servers = await db.serverStore.getAllServers();
      const viewData = {
        title: "LCManager Dashboard",
        user: loggedInUser,
        servers: servers,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addServer: {
    handler: async function (request, h) {
      const newServer = {
        title: request.payload.title,
      };
      await db.serverStore.addServer(newServer);
      return h.redirect("/dashboard");
    },
  },
};
