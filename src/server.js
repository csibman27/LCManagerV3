import Vision from "@hapi/vision";
// eslint-disable-next-line import/no-extraneous-dependencies
import Inert from "@hapi/inert";
import Hapi, { server } from "@hapi/hapi";
import path from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import Cookie from "@hapi/cookie";
import Joi from "joi";
import dotenv from "dotenv";
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from "hapi-auth-jwt2";
// eslint-disable-next-line import/no-extraneous-dependencies
import HapiSwagger from "hapi-swagger";
// eslint-disable-next-line import/no-extraneous-dependencies
import pkg from "handlebars-paginate";
import fs from "fs";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { apiRoutes } from "./api-routes.js";
import { validate } from "./api/jwt-utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const publicPath = path.join(__dirname, "./public");

const test = 1998;

// pagination
const { paginate } = pkg;
Handlebars.registerHelper("paginate", paginate);

const swaggerOptions = {
  info: {
    title: "LCManager API",
    version: "1.0",
  },
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [{ jwt: [] }],
};

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    // host: process.env.HOST,
    routes: {
      cors: true,
    },
    // tls: {
    // key: fs.readFileSync("keys/private/webserver.key"),
    // cert: fs.readFileSync("keys/webserver.crt"),
    // },
  });

  const result = dotenv.config({ silent: true }); // change to silent: true can help to deploy it to heroku it is failing otherwise
  if (result.error) {
    console.log(result.error.message);
    // process.exit(1);
  }

  await server.register(Vision);
  await server.register(Cookie);
  await server.register(jwt);
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  server.validator(Joi);

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
    // expiresIn: "1h",
  });
  server.auth.default("session");

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
  // server.get("/", (req, res) => {
  //   const darkModeQuery = req.query.darkmode;
  //   const darkModeClass = darkModeQuery === "true" ? "dark" : "";
  // });
  // Handle requests

  db.init();
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
