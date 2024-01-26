// Gateway for different models
// DB Controller

import { userMemStore } from "./mem/user-mem-store.js";
import { serverMemStore } from "./mem/server-mem-store.js";
import { serviceMemStore } from "./mem/service-mem-store.js";

export const db = {
  userStore: null,
  serverStore: null,
  serviceStore: null,

  init() {
    this.userStore = userMemStore;
    this.serverStore = serverMemStore;
    this.serviceStore = serviceMemStore;
  },
};
