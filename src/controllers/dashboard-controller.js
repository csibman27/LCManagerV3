import fs from "fs";
import { db } from "../models/db.js";
import { ServerSpec, ServiceSpec } from "../models/joi-schemas.js";
import { analytics } from "../utils/analytics.js";

const newDate = new Date();

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const loggedInUserInitials = loggedInUser.firstName[0] + loggedInUser.lastName[0];
      const servers = await db.serverStore.getAllServers();
      const services = await db.serviceStore.getAllServices();
      const users = await db.userStore.getAllUsers();
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
        services,
        users,
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
    handler: async function (request, h, res) {
      const loggedInUser = request.auth.credentials;
      const userFullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
      const servers = await db.serverStore.getAllServers();
      const newServer = {
        userid: loggedInUser._id,
        title: request.payload.title,
        tag: request.payload.tag,
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
        pieStatus: await analytics.progressPie(request.payload.pdate),
        maintenancecost: Number(0),
      };
      const serverTitles = [];
      for (let a = 0; a < servers.length; a += 1) {
        const server = servers[a].title;
        serverTitles.push(server);
      }
      if (serverTitles.includes(request.payload.title)) {
        return h.view("error-title");
      } else {
        fs.appendFile("./logs.txt", `\nServer created at Date: ${newDate} title: ${request.payload.title} tag: ${request.payload.tag} ID: ${userFullName}`, () => {
          console.log("Successfully saved");
        });
        await db.serverStore.addServer(newServer);
        return h.redirect("/dashboard");
      }
    },
  },

  confirmDelete: {
    handler: async function (request, h) {
      const id = await db.serverStore.getServerById(request.params.id);
      return h.view("confirm-delete", { id });
    },
  },

  deleteServer: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const userFullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
      const server = await db.serverStore.getServerById(request.params.id);
      let serverServices = [];
      serverServices = await db.serviceStore.getServicesByServerId(server._id);
      for (let i = 0; i < serverServices.length; i += 1) {
        await db.serviceStore.deleteService(serverServices[i]);
      }
      fs.appendFile("./logs.txt", `\nServer deleted at Date: ${newDate} title: ${server.title} tag: ${server.tag} ID: ${userFullName}`, () => {
        console.log("Successfully saved");
      });
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

  easySortServer: {
    // it works over console but view not popping
    handler: async function (request, h) {
      const servers = await db.serverStore.getAllServers();
      const so = analytics.filter(servers, "az");
      const viewData = {
        title: "LCManager Dashboard",
        so,
      };
      console.log(so);
      return h.view("dashboard-view", viewData);
    },
  },

  filterServer: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const loggedInUserInitials = loggedInUser.firstName[0] + loggedInUser.lastName[0];
      const servers = await db.serverStore.getAllServers();
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
      };
      let sortedData = [];
      const { orderBy } = request.query;
      if (orderBy === "asc") {
        sortedData = servers.sort((a, b) => (a.title > b.title ? 1 : -1));
      } else if (orderBy === "desc") {
        sortedData = servers.sort((a, b) => (a.title < b.title ? 1 : -1));
      } else if (orderBy === "cabnum") {
        sortedData = servers.sort((a, b) => (a.cab > b.cab ? 1 : -1));
      } else if (orderBy === "normal") {
        return h.view("dashboard-view", viewData);
      } else {
        sortedData = servers;
      }
      return h.view("dashboard-view", { resolution: sortedData });
    },
  },
  decomissionServer: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const userFullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
      const server = await db.serverStore.getServerById(request.params.id);
      const newDispserver = server;
      let serverServices = [];
      serverServices = await db.serviceStore.getServicesByServerId(server._id);
      for (let i = 0; i < serverServices.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await db.serviceStore.deleteService(serverServices[i]);
      }
      fs.appendFile("./logs.txt", `\nServer archived at Date: ${newDate} title: ${server.title} tag: ${server.tag} ID: ${userFullName}`, () => {
        console.log("Successfully saved");
      });
      await db.serverStore.deleteServerById(server._id);
      await db.dispserverStore.addDispserver(newDispserver);
      return h.redirect("/dashboard");
    },
  },
};
