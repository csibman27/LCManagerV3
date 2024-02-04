import { db } from "../models/db.js";

const today = new Date();

export const analytics = {
  async getAllServers() {
    const servers = await db.serverStore.getAllServers();
    const totalServers = servers.length;
    return totalServers;
  },

  async getTotalServices() {
    const services = await db.serviceStore.getAllServices();
    const totalServices = services.length;
    return totalServices;
  },

  async getAgeOfServer() {
    let days = null;
    let year = null;
    const servers = await db.serverStore.getAllServers();
    if (servers.length > 0) {
      for (let i = 0; i < servers.length; i++) {
        const s = servers[i].pdate;
        // convert the value to a date before calling the method
        const purchaseDate = new Date(s);
        const dateNow = new Date();
        // Calculating the time difference of two dates
        const differenceInTime = dateNow.getTime() - purchaseDate.getTime();
        // calculating the number of days between two dates
        const diffInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
        console.log("Result in days: " + diffInDays);
        // Convert days to Year
        const daysToYear = diffInDays / 365;
        console.log("Years: " + daysToYear);
        days = diffInDays;
        year = daysToYear;
      }
    }
    return days;
  },
  async pie() {
    // Array containing the 5 different colors
    const colors = ["red", "green", "blue", "yellow", "orange"];
  },
};
