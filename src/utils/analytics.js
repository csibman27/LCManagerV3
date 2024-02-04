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
    for (let i = 0; i < servers.length; i++) {
      const pdate = servers[i].pdate;
      console.log(`a: ${servers[i].pdate}`);
      // convert the value to a date before calling the method
      const purchaseDate = new Date(pdate);
      const dateNow = new Date();
      console.log(dateNow.toLocaleDateString());
      // Calculating the time difference of two dates
      const differenceInTime = dateNow.getTime() - purchaseDate.getTime();
      console.log("Calculated time: " + differenceInTime);
      // calculating the number of days between two dates
      const diffInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
      console.log("Result in days: " + diffInDays);
      // Convert days to Year
      const daysToYear = diffInDays / 365;
      console.log("Years: " + daysToYear);
      days = diffInDays;
      year = daysToYear;
    }
    if (days >= 0 && days < 365) {
      return days;
    }
    if (days < 0) {
      return null;
    }
    return year;
  },
};
