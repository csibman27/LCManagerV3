import { db } from "../models/db.js";
import { ServiceSpec } from "../models/joi-schemas.js";
import { analytics } from "../utils/analytics.js";

export const serverController = {
  index: {
    handler: async function (request, h) {
      // analytics about server age and other server information
      const server = await db.serverStore.getServerById(request.params.id);
      const pdate = server.pdate;
      const purchaseDate = new Date(pdate);
      const serverAgeId = await analytics.getAgeOfServerById(purchaseDate);
      const company = "[Company name]";
      const date = new Date().getFullYear();
      // serverAge can eventually check for least and most age servers
      // at the moment it returns an array of server ages in days
      const serverAge = await analytics.getAgeOfServer();
      const allServices = await analytics.getTotalServices();
      // const pie = await analytics.pie();
      const viewData = {
        title: "Servers",
        server: server,
        company: company,
        allServices,
        serverAge,
        date,
        serverAgeId,
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
      console.log(newService);
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
};
