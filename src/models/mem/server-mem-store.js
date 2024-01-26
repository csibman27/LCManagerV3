import { v4 } from "uuid";
import { serviceMemStore } from "./service-mem-store.js";

let servers = [];

export const serverMemStore = {
  async getAllServers() {
    return servers;
  },

  async addServer(server) {
    server._id = v4();
    servers.push(server);
    return server;
  },

  async getServerById(id) {
    const list = servers.find((server) => server._id === id);
    list.machines = await serviceMemStore.getServicesByServerId(list._id);
    return list;
  },

  async getUserServices(userid) {
    return servers.filter((server) => server.userid === userid);
  },

  async deleteServerById(id) {
    const index = servers.findIndex((server) => server._id === id);
    servers.splice(index, 1);
  },

  async deleteAllServers() {
    servers = [];
  },
};
