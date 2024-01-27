// Gateway for different models
// DB Controller

// Use of Mem Store
// import { userMemStore } from "./mem/user-mem-store.js";
// import { serverMemStore } from "./mem/server-mem-store.js";
// import { serviceMemStore } from "./mem/service-mem-store.js";

// Use of Json Store
import { userJsonStore } from "./json/user-json-store.js";
import { serverJsonStore } from "./json/server-json-store.js";
import { serviceJsonStore } from "./json/service-json-store.js";

export const db = {
  userStore: null,
  serverStore: null,
  serviceStore: null,

  init() {
    // this.userStore = userMemStore;
    // this.serverStore = serverMemStore;
    // this.serviceStore = serviceMemStore;

    this.userStore = userJsonStore;
    this.serverStore = serverJsonStore;
    this.serviceStore = serviceJsonStore;
  },
};
