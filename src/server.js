import Vision from "@hapi/vision";
import Hapi from "@hapi/hapi";
import path from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import Cookie from "@hapi/cookie";
import Joi from "joi";
import dotenv from "dotenv";
// eslint-disable-next-line import/no-extraneous-dependencies
import pkg from "handlebars-paginate";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { apiRoutes } from "./api-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const test = 1998;

// pagination
const { paginate } = pkg;
Handlebars.registerHelper("paginate", paginate);

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    host: process.env.HOST,
  });

  const result = dotenv.config({ silent: true }); // change to silent: true can help to deploy it to heroku it is failing otherwise
  if (result.error) {
    console.log(result.error.message);
    // process.exit(1);
  }

  await server.register(Vision);
  await server.register(Cookie);
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

  db.init();
  server.route(webRoutes);
  server.route(apiRoutes);
  // server.route({
  //   method: "GET",
  //   path: "/public/{param*}",
  //   handler: {
  //     directory: {
  //       path: path.join(__dirname, "public"),
  //     },
  //   },
  // });
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
