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

  async addServer(server) {
    await db.read();
    server._id = v4();
    db.data.servers.push(server);
    await db.write();
    return server;
  },

  async getServerById(id) {
    await db.read();
    const list = db.data.servers.find((server) => server._id === id);
    list.services = await serviceJsonStore.getServicesByServerId(list._id);
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
};
