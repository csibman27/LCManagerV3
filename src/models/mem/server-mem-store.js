import { v4 } from "uuid";
import { machineMemStore } from "./machine-mem-store.js";

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
    return servers.find((server) => server._id === id);
  },

  async deleteServerById(id) {
    const index = servers.findIndex((server) => server._id === id);
    servers.splice(index, 1);
  },

  async deleteAllServers() {
    servers = [];
  },
};
