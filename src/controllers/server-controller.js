import { db } from "../models/db.js";
import { userMemStore } from "../models/mem/user-mem-store.js";

export const serverController = {
  index: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const company = "[Company name]";
      const viewData = {
        title: "Servers",
        server: server,
        company: company,
      };
      return h.view("server-view", viewData);
    },
  },

  addService: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const newService = {
        title: request.payload.title,
        os: request.payload.os,
        desc: request.payload.description,
        monitored: request.payload.monitored,
        backups: request.payload.backups,
        syslog: request.payload.syslog,
        login: request.payload.login,
        // modified: logged in user name
        // firmware: request.payload.firmware,
        // date: Number(request.payload.duration),
      };
      await db.serviceStore.addService(server._id, newService);
      console.log(newService);
      return h.redirect(`/server/${server._id}`);
    },
  },
};
