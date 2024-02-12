import { db } from "../models/db.js";
import { ServerSpec } from "../models/joi-schemas.js";
import { analytics } from "../utils/analytics.js";

const newDate = new Date();
// const searchInput = document.getElementById("searchInput");

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const loggedInUserInitials = loggedInUser.firstName[0] + loggedInUser.lastName[0];
      const servers = await db.serverStore.getAllServers();
      // const userInput = h.view();
      // const servers2 = await db.serverStore.getServerByTitle(userInput);
      // Filter
      const filterCab = await analytics.filerByCab(servers);
      const filterAlphabetic = await analytics.filterByAlphabetic(servers);
      // Other
      const company = "[Company name]";
      const date = new Date().getFullYear();
      // display data
      const viewData = {
        title: "LCManager Dashboard",
        user: loggedInUser,
        company: company,
        date,
        loggedInUserInitials,
        servers: servers,
        filterCab,
        filterAlphabetic,
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
    handler: async function (request, h) {
      const searchTerm = request.query.term;
      const servers = await db.serverStore.getAllServers();
      const searchResult = servers.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
      return h.view("dashboard-view", { results: searchResult });
    },
  },
};
