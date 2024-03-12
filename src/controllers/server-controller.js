import fs from "fs";
import { db } from "../models/db.js";
import { ServiceSpec } from "../models/joi-schemas.js";
import { analytics } from "../utils/analytics.js";

const newDate = new Date();

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
      const loggedInUser = request.auth.credentials;
      const userFullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
      const services = await db.serviceStore.getServicesByServerId(request.params.id);
      const server = await db.serverStore.getServerById(request.params.id);
      const newService = {
        serviceName: request.payload.serviceName,
        servicetag: request.payload.servicetag, // {local service}, {proxmox service}, {vmware service}, {openstack service}, {aws service}
        os: request.payload.os,
        desc: request.payload.desc,
        monitored: request.payload.monitored,
        backups: request.payload.backups,
        syslog: request.payload.syslog,
        login: request.payload.login,
      };
      const serviceTitles = [];
      for (let a = 0; a < services.length; a += 1) {
        const service = services[a].serviceName;
        serviceTitles.push(service);
      }
      if (serviceTitles.includes(request.payload.serviceName)) {
        return h.view("error-servicename");
      } else {
        console.log(`new service added at ${newDate} with tag: ${request.payload.serviceName}`);
        fs.appendFile("./logs.txt", `\nService created at Date: ${newDate} title: ${request.payload.serviceName} tag: ${request.payload.servicetag} ID: ${userFullName}`, () => {
          console.log("Successfully saved");
        });
        await db.serviceStore.addService(server._id, newService);
        return h.redirect(`/server/${server._id}`);
      }
    },
  },

  deleteService: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const userFullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
      const server = await db.serverStore.getServerById(request.params.id);
      const readService = JSON.stringify(server.services);
      await db.serviceStore.deleteService(request.params.serviceid);
      fs.appendFile("./logs.txt", `\nService deleted at date: ${newDate} server host: ${server.title} service: ${readService} ID: ${userFullName}`, () => {
        console.log("Successfully saved");
      });
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
        maintenancecost: Number(request.payload.maintenancecost),
      };
      // console.log(JSON.stringify(obj));
      try {
        await db.serverStore.updateServerMaintenanceCost(server, newServer);
      } catch (error) {
        console.log(error);
      }
      return h.redirect(`/server/${server._id}`);
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

  updateMaas: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const newServer = {
        maas: Boolean(request.payload.maas),
      };
      // console.log(JSON.stringify(obj));
      try {
        await db.serverStore.updateServerMaas(server, newServer);
      } catch (error) {
        console.log(error);
      }
      return h.redirect(`/server/${server._id}`);
    },
  },

  showMaas: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const viewData = {
        title: "Update Server",
        server: server,
      };
      // console.log(server);
      return h.view("update-maas-view", viewData);
    },
  },

  update: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const userFullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
      const server = await db.serverStore.getServerById(request.params.id);
      const newServer = {
        title: request.payload.title,
        tag: request.payload.tag,
        cab: Number(request.payload.cab),
        os: request.payload.os,
        // idrac: request.payload.idrac,
        // nwcard: request.payload.nwcard,
        // backupTo: request.payload.backupTo,
        // monitoredWith: request.payload.monitoredWith,
        // support: request.payload.support,
        service: request.payload.service,
        // bios: request.payload.bios,
        // firmware: request.payload.firmware,
        // maas: Boolean(request.payload.maas),
        // cost: request.payload.cost,
        // pdate: request.payload.pdate,
        // model: request.payload.model,
        // desc: request.payload.desc,
      };
      try {
        fs.appendFile("./logs.txt", `\nServer updated at date: ${newDate} new title: ${newServer.title} ID: ${userFullName}`, () => {
          console.log("Successfully saved");
        });
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
