// Gateway for different models
// DB Controller

import { userMemStore } from "./mem/user-mem-store.js";
import { serverMemStore } from "./mem/server-mem-store.js";

export const db = {
  userStore: null,
  serverStore: null,

  init() {
    this.userStore = userMemStore;
    this.serverStore = serverMemStore;
  },
};
