import { db } from "../models/db.js";
import { ServerSpec } from "../models/joi-schemas.js";

const newDate = new Date();

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const servers = await db.serverStore.getAllServers();
      servers.sort((a, b) => (a.title > b.title ? 1 : -1));
      const company = "[Company name]";
      // display data
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
        nwcard: request.payload.nwcard,
        backupTo: request.payload.backupTo,
        monitoredWith: request.payload.monitoredWith,
        support: request.payload.support,
        service: request.payload.service,
        bios: request.payload.bios,
        firmware: request.payload.firmware,
        maas: Boolean(request.payload.maas),
        cost: request.payload.cost,
        pdate: request.payload.pdate,
        model: request.payload.model,
        desc: request.payload.desc,
        date: newDate.toISOString(), // date in ISO 8601 format.
      };
      await db.serverStore.addServer(newServer);
      return h.redirect("/dashboard");
    },
  },

  deleteServer: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      let serverServices = [];
      serverServices = await db.serviceStore.getServicesByServerId(server._id);
      for (let i = 0; i < serverServices.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await db.serviceStore.deleteService(serverServices[i]);
      }
      await db.serverStore.deleteServerById(server._id);
      return h.redirect("/dashboard");
    },
  },

  searchServer: {
    handler: async function (request, h) {},
  },
};
