import { db } from "../models/db.js";
import { UserSpec } from "../models/joi-schemas.js";
import bcrypt from "bcrypt";

const saltRounds = 10; // ADDED hashing & salting

export const userController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const loggedInUserInitials = loggedInUser.firstName[0] + loggedInUser.lastName[0];
      const users = await db.userStore.getAllUsers();
      const date = new Date().getFullYear();
      const company = "[Company name]";
      const viewData = {
        title: "Project users",
        date,
        company,
        loggedInUserInitials,
        users,
      };
      return h.view("users-view", viewData);
    },
  },

  showUser: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up" });
    },
  },
  addUser: {
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
      user.password = await bcrypt.hash(user.password, saltRounds); // hash & salt the password
      await db.userStore.addUser(user);
      return h.redirect("/users");
    },
  },

  confirmDelete: {
    handler: async function (request, h) {
      const id = await db.userStore.getUserById(request.params.id);
      return h.view("confirm-delete-users", { id });
    },
  },

  deleteUserAccount: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/users");
    },
  },

  addUserView: {
    handler: async function (request, h) {
      const id = await db.userStore.getUserById(request.params.id);
      const viewData = {
        title: "User View",
      };
      return h.view("add-user-view", viewData);
    },
  },
};
