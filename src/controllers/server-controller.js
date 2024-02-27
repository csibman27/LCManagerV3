import { db } from "../models/db.js";
import { ServiceSpec } from "../models/joi-schemas.js";
import { analytics } from "../utils/analytics.js";

export const serverController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const loggedInUserInitials = loggedInUser.firstName[0] + loggedInUser.lastName[0];
      // analytics about server age and other server information
      const server = await db.serverStore.getServerById(request.params.id);
      const pdate = server.pdate;
      const purchaseDate = new Date(pdate);
      const serverAgeId = await analytics.getAgeOfServerById(purchaseDate);
      // support check
      const sdate = server.support;
      const supportExpireDate = new Date(sdate);
      const eSupport = await analytics.supportCheck(supportExpireDate);
      // others
      const company = "[Company name]";
      const date = new Date().getFullYear();
      // serverAge can eventually check for least and most aged server

      // pie data
      const pie = await analytics.progressPie(purchaseDate);

      const viewData = {
        title: "Servers",
        server: server,
        company: company,
        date,
        serverAgeId,
        loggedInUserInitials,
        pie,
        eSupport,
      };
      return h.view("server-view", viewData);
    },
  },

  addService: {
    // joi schema security
    validate: {
      payload: ServiceSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const currentServer = await db.serverStore.getServerById(request.params.id);
        return h.view("server-view", { title: "Add Service error", server: currentServer, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const newService = {
        serviceName: request.payload.serviceName,
        os: request.payload.os,
        desc: request.payload.desc,
        monitored: request.payload.monitored,
        backups: request.payload.backups,
        syslog: request.payload.syslog,
        login: request.payload.login,
      };
      await db.serviceStore.addService(server._id, newService);
      // console.log(newService);
      return h.redirect(`/server/${server._id}`);
    },
  },

  deleteService: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      await db.serviceStore.deleteService(request.params.serviceid);
      return h.redirect(`/server/${server._id}`);
    },
  },

  searchService: {
    handler: async function (request, h) {
      const searchTerm = request.query.term2;
      // const server = await db.serverStore.getServerById(request.params.id);
      const service = await db.serviceStore.getServicesByServerId(request.params.id);
      // console.log(service);
      // const service = await db.serviceStore.getAllServices();
      const searchResult = service.filter((item) => item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()));
      return h.view("server-view", { results: searchResult });
    },
  },
  updateCost: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const newServer = {
        maintenancecost: request.payload.maintenancecost,
      };
      try {
        await db.serverStore.updateServerMaintenanceCost(server, newServer);
      } catch (error) {
        console.log(error);
      }
      return h.redirect(`/server/${server._id}`);
      // return h.redirect("/dashboard");
    },
  },

  showMaintenanceCostDetails: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const viewData = {
        title: "Update Server",
        server: server,
      };
      // console.log(server);
      return h.view("update-maintenance-cost-view", viewData);
    },
  },

  update: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const newServer = {
        title: request.payload.title,
        cab: Number(request.payload.cab),
        os: request.payload.os,
        // idrac: request.payload.idrac,
        // nwcard: request.payload.nwcard,
        // backupTo: request.payload.backupTo,
        // monitoredWith: request.payload.monitoredWith,
        // support: request.payload.support,
        // service: request.payload.service,
        // bios: request.payload.bios,
        // firmware: request.payload.firmware,
        // maas: Boolean(request.payload.maas),
        // cost: request.payload.cost,
        // pdate: request.payload.pdate,
        // model: request.payload.model,
        // desc: request.payload.desc,
      };
      try {
        await db.serverStore.updateServer(server, newServer);
      } catch (error) {
        console.log(error);
      }
      return h.redirect("/dashboard");
    },
  },

  showServerDetails: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const viewData = {
        title: "Update Server",
        server: server,
      };
      // console.log(server);
      return h.view("update-server-view", viewData);
    },
  },
};
