import { ServiceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const serviceController = {
  index: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const service = await db.serviceStore.getServiceById(request.params.serviceid);
      const loggedInUser = request.auth.credentials;
      const viewData = {
        title: "Edit Service",
        server: server,
        service: service,
        user: loggedInUser,
      };
      return h.view("update-service-view", viewData);
    },
  },

  update: {
    validate: {
      payload: ServiceSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("update-service-view", { title: "Edit service error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const service = await db.serviceStore.getServiceById(request.params.serviceid);
      const newService = {
        serviceName: request.payload.serviceName,
        os: request.payload.os,
        desc: request.payload.desc,
        monitored: request.payload.monitored,
        backups: request.payload.backups,
        syslog: request.payload.syslog,
        login: request.payload.login,
      };
      try {
        await db.serviceStore.updateService(service, newService);
      } catch (error) {
        console.log(error);
      }
      return h.redirect(`/server/${request.params.id}`);
    },
  },

  showServiceDetails: {
    handler: async function (request, h) {
      const service = await db.serviceStore.getServiceById(request.params.serviceid);
      const viewData = {
        title: "Update Service",
        service: service,
      };
      return h.view("update-service-view", viewData);
    },
  },
};
