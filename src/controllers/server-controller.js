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
        cab: request.payload.cab,
        idrac: request.payload.idrac,
        bios: request.payload.bios,
        firmware: request.payload.firmware,
        // date: Number(request.payload.duration),
      };
      await db.machineStore.addMachine(server._id, newMachine);
      return h.redirect(`/server/${server._id}`);
    },
  },
};
