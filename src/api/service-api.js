import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ServiceSpec, ServiceSpecPlus, ServiceArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const serviceApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const services = await db.serviceStore.getAllServices();
        return services;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ServiceArraySpec, failAction: validationError },
    description: "Get all ServiceApi",
    notes: "Returns all serviceApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const service = await db.serviceStore.getServiceById(request.params.id);
        if (!service) {
          return Boom.notFound("No service with this id");
        }
        return service;
      } catch (err) {
        return Boom.serverUnavailable("No service with this id");
      }
    },
    tags: ["api"],
    description: "Find a Service",
    notes: "Returns a service",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ServiceSpecPlus, failAction: validationError },
  },

  findServicesByServerId: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const service = await db.serviceStore.getServicesByServerId(request.params.id);
        if (!service) {
          return Boom.notFound("No service with this id");
        }
        return service;
      } catch (err) {
        return Boom.serverUnavailable("No service with this id");
      }
    },
    tags: ["api"],
    description: "Find a Service",
    notes: "Returns a service",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ServiceArraySpec, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const service = await db.serviceStore.addService(request.params.id, request.payload);
        if (service) {
          return h.response(service).code(201);
        }
        return Boom.badImplementation("error creating service");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a service",
    notes: "Returns the newly created service",
    validate: { payload: ServiceSpec },
    response: { schema: ServiceSpecPlus, failAction: validationError },
  },

  updateService: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const service = await db.serviceStore.updateService(request.params.serviceid, request.payload);
        if (service) {
          return h.response(service).code(201);
        }
        return Boom.badImplementation("error creating service");
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a Service",
    notes: "Returns the updated service",
    validate: { payload: ServiceSpecPlus },
    response: { schema: ServiceSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.serviceStore.deleteAllServices();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all stationApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const service = await db.serviceStore.getServiceById(request.params.id);
        if (!service) {
          return Boom.notFound("No Service with this id");
        }
        await db.serviceStore.deleteService(service._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Service with this id");
      }
    },
    tags: ["api"],
    description: "Delete a service",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
