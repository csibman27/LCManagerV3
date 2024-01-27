import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/services.json"), {});
db.data = { services: [] };

export const serviceJsonStore = {
  async getAllServices() {
    await db.read();
    return db.data.services;
  },

  async addService(serverId, service) {
    await db.read();
    service._id = v4();
    service.serverid = serverId;
    db.data.services.push(service);
    await db.write();
    return service;
  },

  async getServicesByServerId(id) {
    await db.read();
    return db.data.services.filter((service) => service.serverid === id);
  },

  async getServiceById(id) {
    await db.read();
    return db.data.services.find((service) => service._id === id);
  },

  async deleteService(id) {
    await db.read();
    const index = db.data.services.findIndex((service) => service._id === id);
    db.data.services.splice(index, 1);
    await db.write();
  },

  async deleteAllServices() {
    db.data.services = [];
    await db.write();
  },

  async updateService(service, updatedService) {
    service.title = updatedService.title;
    service.os = updatedService.os;
    service.desc = updatedService.desc;
    await db.write();
  },
};
