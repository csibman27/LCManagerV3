import { db } from "../models/db.js";
import { ServiceSpec } from "../models/joi-schemas.js";
import { analytics } from "../utils/analytics.js";

export const serverController = {
  index: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const company = "[Company name]";
      // some analytics
      const serverAge = await analytics.getAgeOfServer();
      // let differenceInTime = today.getTime() - today.getTime();
      // console.log("Server age: " + server.pdate);
      const allServices = await analytics.getTotalServices();
      // const allServices = 12;
      const viewData = {
        title: "Servers",
        server: server,
        company: company,
        allServices,
        serverAge,
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
};
