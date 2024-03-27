// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcrypt"; // ADDED hashing & salting
import { UserSpec, UserCredentialsSpec, UserSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import Boom from "@hapi/boom";

const saltRounds = 10; // ADDED hashing & salting

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Lifecycle Manager" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      // user.password = await bcrypt.hash(user.password, saltRounds); // hash & salt the password
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },

  showUpdate: {
    auth: false,
    handler: function (request, h) {
      return h.view("updates-view", { title: "Update screen" });
    },
  },

  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Lifecycle Manager" });
    },
  },
  login: {
    auth: false,
    // joi schema
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      // const passwordsMatch = await bcrypt.compare(password, user.password); // ADDED hashing & salting
      if (!user || user.password !== password) {
        // const message = "Email address is not registered";
        // throw Boom.unauthorized(message);
        // OLD
        // if (!user || !passwordsMatch) {
        // new statement for hashing
          // console.log(passwordsMatch);
        return h.redirect("/");
      }
      else {
        await sleep(1000);
        request.cookieAuth.set({ id: user._id });

        // console.log(user._id);
        return h.redirect("/dashboard").unstate("data");
      }
    },
  },
  // Clear cookie on logout
  logout: {
    handler: function (request, h, res) {
      // request.header("Cache-Control', 'private, no-cache, no-store, must-revalidate");
      // res.header("Expires", "-1");
      // res.header("Pragma", "no-cache");
      // res.set("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
      request.cookieAuth.clear();
      return h.redirect("/").unstate("data");
    },
  },

  loggedInUserDetails: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "User Account",
        user: user,
      };
      return h.view("user-view", viewData);
    },
  },

  updateLoggedInUser: {
    validate: {
      payload: UserSpecPlus,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("user-view", { title: "Error", errors: error.details }).takeover.code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      // const user = await db.userStore.getUserById(loggedInUser._id);
      const updatedUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
        // password: await bcrypt.hash(request.payload.password, saltRounds),
      };
      try {
        await db.userStore.updateUser(loggedInUser, updatedUser);
        // await db.userStore.updateUser(user, updatedUser);
      } catch (error) {
        console.log(error);
      }
      return h.view("login-view");
    },
  },

  confirmDelete: {
    handler: async function (request, h) {
      const id = await db.userStore.getUserById(request.params.id);
      return h.view("confirm-delete-user", { id });
    },
  },

  deleteUserAccount: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      // delete user created servers and services
      // let userStations = [];
      // userStations = await db.serviceStore.getUserServices(loggedInUser._id);
      // for (let i = 0; i < userStations.length; i += 1) {
      //   let userServers = [];
      //
      //   // eslint-disable-next-line no-await-in-loop
      //   userServers = await db.serverStore.getServersByServiceId(userServices[i]._id);
      //   for (let k = 0; k < userServers.length; k += 1) {
      //     // eslint-disable-next-line no-await-in-loop
      //     await db.serverStore.deleteServerById(userServers[k]._id);
      //   }
      //   // eslint-disable-next-line no-await-in-loop
      //   await db.serviceStore.deleteService(userServices[i]._id);
      // }
      await db.userStore.deleteUserById(loggedInUser._id);
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
