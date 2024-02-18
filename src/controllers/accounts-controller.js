// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcrypt"; // ADDED hashing & salting
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
      await db.userStore.addUser(user);
      return h.redirect("/");
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
        // OLD
        // if (!user || !passwordsMatch) {
        // new statement for hashing
        return h.redirect("/");
      }
      await sleep(2000);
      request.cookieAuth.set({ id: user._id });
      // console.log(user._id);
      return h.redirect("/dashboard");
    },
  },
  // Clear cookie on logout
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
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
