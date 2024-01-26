import { db } from "../models/db.js";

const newDate = new Date();

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
        cab: Number(request.payload.cab),
        os: request.payload.os,
        idrac: request.payload.idrac,
        desc: request.payload.os,
        backupTo: request.payload.backupTo,
        monitoredWith: request.payload.monitoredWith,
        support: request.payload.support,
        service: request.payload.service,
        bios: request.payload.bios,
        firmware: request.payload.firmware,
        maas: request.payload.maas,
        date: newDate.toISOString(), // date in ISO 8601 format.
      };
      await db.serverStore.addServer(newServer);
      return h.redirect("/dashboard");
    },
  },
};
