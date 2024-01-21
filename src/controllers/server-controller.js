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

  addMachine: {
    handler: async function (request, h) {
      const server = await db.serverStore.getServerById(request.params.id);
      const newMachine = {
        title: request.payload.title,
        description: request.payload.description,
        // ipv4: Number(request.payload.duration),
      };
      await db.serverStore.addMachine(server._id, newMachine);
      return h.redirect(`/server/${server._id}`);
    },
  },
};
