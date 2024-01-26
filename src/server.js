import Vision from "@hapi/vision";
import Hapi from "@hapi/hapi";
import path from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import Cookie from "@hapi/cookie";
import { accountsController } from "./controllers/accounts-controller.js";
import Joi from "joi";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const test = 1998;

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
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
