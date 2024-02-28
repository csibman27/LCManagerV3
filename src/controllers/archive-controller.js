import { db } from "../models/db.js";

export const archiveController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const loggedInUserInitials = loggedInUser.firstName[0] + loggedInUser.lastName[0];
      const dispservers = await db.dispserverStore.getAllDispservers();
      // Other
      const company = "[Company name]";
      const date = new Date().getFullYear();
      // display data
      const viewData = {
        title: "Archives",
        user: loggedInUser,
        company: company,
        date,
        loggedInUserInitials,
        dispservers: dispservers,
      };
      return h.view("archive-view", viewData);
    },
  },

  confirmDelete: {
    handler: async function (request, h) {
      const id = await db.dispserverStore.getDispserverById(request.params.id);
      return h.view("confirm-delete-archive", { id });
    },
  },

  deleteServer: {
    handler: async function (request, h) {
      const dispserver = await db.dispserverStore.getDispserverById(request.params.id);
      await db.dispserverStore.deleteDispserverById(dispserver._id);
      return h.redirect("/archive");
    },
  },

  update: {
    handler: async function (request, h) {
      const dispserver = await db.dispserverStore.getDispserverById(request.params.id);
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
        await db.dispserverStore.updateServer(dispserver, newServer);
      } catch (error) {
        console.log(error);
      }
      return h.redirect("/archive");
    },
  },

  showServerDetails: {
    handler: async function (request, h) {
      const dispserver = await db.dispserverStore.getDispserverById(request.params.id);
      // console.log(dispserver);
      const viewData = {
        title: "Update Disposed Server",
        dispserver: dispserver,
      };
      return h.view("update-dserver-view", viewData);
    },
  },

  recomissionServer: {
    handler: async function (request, h) {
      const dispserver = await db.dispserverStore.getDispserverById(request.params.id);
      const newServer = dispserver;
      let serverServices = [];
      serverServices = await db.serviceStore.getServicesByServerId(dispserver._id);
      for (let i = 0; i < serverServices.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await db.serviceStore.deleteService(serverServices[i]);
      }
      await db.dispserverStore.deleteDispserverById(dispserver._id);
      await db.serverStore.addServer(newServer);
      return h.redirect("/archive");
    },
  },

  confirmRestore: {
    handler: async function (request, h) {
      const id = await db.dispserverStore.getDispserverById(request.params.id);
      return h.view("confirm-restore-archive", { id });
    },
  },
};
