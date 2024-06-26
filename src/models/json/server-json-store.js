import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { serviceJsonStore } from "./service-json-store.js";

const db = new Low(new JSONFile("./src/models/json/servers.json"), {});
db.data = { servers: [] };

export const serverJsonStore = {
  async getAllServers() {
    await db.read();
    return db.data.servers;
  },

  async sortServers() {
    await db.read();

    return db.data.servers
      .sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
  },


  async addServer(server) {
    await db.read();
    server._id = v4();
    db.data.servers.push(server);
    await db.write();
    return server;
  },

  async getServerByTitle(title) {
    await db.read();
    return db.data.servers.find((server) => server.title === title);
  },

  async getServerById(id) {
    await db.read();
    let list = db.data.servers.find((server) => server._id === id);
    if (list) {
      list.services = await serviceJsonStore.getServicesByServerId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserServers(userid) {
    await db.read();
    return db.data.servers.filter((server) => server.userid === userid);
  },

  async deleteServerById(id) {
    await db.read();
    const index = db.data.servers.findIndex((server) => server._id === id);
    db.data.servers.splice(index, 1);
    await db.write();
  },

  async deleteAllServers() {
    db.data.servers = [];
    await db.write();
  },

  updateServer: async function (server, updatedServer) {
    server.title = updatedServer.title;
    server.cab = updatedServer.cab;
    server.os = updatedServer.os;
    server.service = updatedServer.service;
    await db.write();
  },

  updateServerMaintenanceCost: async function (server, updatedServer) {
    server.maintenancecost = updatedServer.maintenancecost;
    await db.write();
  },

  updateServerMaas: async function (server, updatedServer) {
    server.iaas = updatedServer.iaas;
    await db.write();
  },
};
