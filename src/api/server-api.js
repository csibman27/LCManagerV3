import Boom from "@hapi/boom";
import { IdSpec, ServerArraySpec, ServerSpec, ServerSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const serverApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const server = await db.serverStore.getAllServers();
        return server;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ServerArraySpec, failAction: validationError },
    description: "Get all servers",
    notes: "Returns all servers",
  },

  findByUserId: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const servers = await db.serverStore.getUserServers(request.auth.credentials._id);
        return servers;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ServerArraySpec, failAction: validationError },
    description: "Get all servers",
    notes: "Returns all servers",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const server = await db.serverStore.getServerById(request.params.id);
        if (!server) {
          return Boom.notFound("No Server with this id");
        }
        return server;
      } catch (err) {
        return Boom.serverUnavailable("No Server with this id");
      }
    },
    tags: ["api"],
    description: "Find a Server",
    notes: "Returns a server",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ServerSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const server = request.payload;
        server.userid = request.auth.credentials._id;
        const newServer = await db.serverStore.addServer(server);
        if (newServer) {
          return h.response(newServer).code(201);
        }
        return Boom.badImplementation("error creating server");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Server",
    notes: "Returns the newly created server",
    validate: { payload: ServerSpec, failAction: validationError },
    response: { schema: ServerSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const server = await db.serverStore.getServerById(request.params.id);
        if (!server) {
          return Boom.notFound("No Server with this id");
        }
        await db.serverStore.deleteServerById(server._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Server with this id");
      }
    },
    tags: ["api"],
    description: "Delete a server",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.serverStore.deleteAllServers();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all ServerApi",
  },
};
