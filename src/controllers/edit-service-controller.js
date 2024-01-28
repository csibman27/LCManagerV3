import { ServiceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const editServiceController = {
  index: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const services = await db.serviceStore.getServiceById(request.params.serverid);
      const loggedInUser = request.auth.credentials;

      const viewData = {
        title: "Edit Service",
        server: server,
        services: services,
        user: loggedInUser,
      };
      return h.view("server-view", viewData);
    },
  },

  update: {
    validate: {
      payload: ServiceSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("server-view", { title: "Edit service error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.serverid);
      const newService = {
        title: request.payload.title,
        os: request.payload.os,
        desc: request.payload.desc,
        monitored: request.payload.monitored,
        backups: request.payload.backups,
        syslog: request.payload.syslog,
        login: request.payload.login,
      };
      await db.serviceStore.updateService(server, newService);
      return h.redirect(`/server/${request.params.id}`);
    },
  },
};
