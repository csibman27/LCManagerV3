// Temp services store for testing

import { v4 } from "uuid";

let services = [];

export const serviceMemStore = {
  async getAllServices() {
    return services;
  },

  async addService(serverId, service) {
    service._id = v4();
    service.serverid = serverId;
    services.push(service);
    return service;
  },

  async getServicesByServerId(id) {
    return services.filter((service) => service.serverid === id);
  },

  async getServiceById(id) {
    return services.find((service) => service._id === id);
  },

  async getServerServices(serverId) {
    return services.filter((service) => service.serverid === serverId);
  },

  async getServerById(id) {
    const list = servers.find((server) => server._id === id);
    list.services = await serviceMemStore.getServicesByServerId(list._id);
    return list;
  },

  async deleteService(id) {
    const index = services.findIndex((service) => service._id === id);
    services.splice(index, 1);
  },

  async deleteAllServices() {
    services = [];
  },

  async updateService(service, updatedService) {
    service.title = updatedService.title;
    // service.description = updatedService.description;
  },
};
