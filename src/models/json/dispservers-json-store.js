import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/dispservers.json"), {});
db.data = { dispservers: [] };

export const dispserverJsonStore = {
  async getAllDispservers() {
    await db.read();
    return db.data.dispservers;
  },

  async addDispserver(dispserver) {
    await db.read();
    dispserver._id = v4();
    db.data.dispservers.push(dispserver);
    await db.write();
    return dispserver;
  },

  async getDispserverByTitle(title) {
    await db.read();
    return db.data.dispservers.find((dispserver) => dispserver.title === title);
  },

  async deleteDispserverById(id) {
    await db.read();
    const index = db.data.dispservers.findIndex((dispserver) => dispserver._id === id);
    db.data.dispservers.splice(index, 1);
    await db.write();
  },

  async deleteAllDispservers() {
    db.data.dispservers = [];
    await db.write();
  },
};
