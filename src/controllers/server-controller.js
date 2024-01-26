import { db } from "../models/db.js";

export const serverController = {
  index: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const viewData = {
        title: "Servers",
        server: server,
      };
      return h.view("server-view", viewData);
    },
  },

  addService: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const newService = {
        title: request.payload.title,
        cab: request.payload.cab,
        idrac: request.payload.idrac,
        bios: request.payload.bios,
        firmware: request.payload.firmware,
        // date: Number(request.payload.duration),
      };
      await db.serviceStore.addService(server._id, newService);
      return h.redirect(`/server/${server._id}`);
    },
  },
};
