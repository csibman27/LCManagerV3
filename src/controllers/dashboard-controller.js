import { db } from "../models/db.js";
import { ServerSpec } from "../models/joi-schemas.js";

const newDate = new Date();

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const servers = await db.serverStore.getAllServers();
      const company = "[Company name]";
      const viewData = {
        title: "LCManager Dashboard",
        user: loggedInUser,
        servers: servers,
        company: company,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addServer: {
    // joi schema
    validate: {
      payload: ServerSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Server error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newServer = {
        userid: loggedInUser._id,
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
