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

  // used to create analytics to determine the least and most old server
  async getAgeOfServer() {
    let days = [];
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
        // console.log("Result in days: " + diffInDays);
        // Convert days to Year
        const daysToYear = diffInDays / 365;
        // console.log("Years: " + daysToYear);
        days.push(diffInDays);
        // year = daysToYear;
      }
    }
    return days;
  },
  async getAgeOfServerById(pdate) {
    // let days = null;
    const purchaseDate = new Date(pdate);
    const dateNow = new Date();
    // Calculating the time difference of two dates
    const differenceInTime = dateNow.getTime() - purchaseDate.getTime();
    // calculating the number of days between two dates
    const diffInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
    // Convert days to Year
    const daysToYear = diffInDays / 365;
    if (diffInDays < 365) {
      return diffInDays + " days";
    }
    return daysToYear.toFixed(1) + " years";
  },

  async searchServerByTitle(title, array) {
    const result = [];

    console.log("search Function called");
    for (let i = 0; i < array.length; i++) {
      if (array[i].title.toLowerCase().includes(title.toLowerCase())) {
        result.push(array[i]);
      }
    }
    return result;
  },

  async filerByCab(array) {
    array.sort((a, b) => (a.cab > b.cab ? 1 : -1));
    console.log("Filtering by CAB function called!");
  },

  async filterByAlphabetic(array) {
    array.sort((a, b) => (a.title > b.title ? 1 : -1));
    console.log("Filtering by alphabetic order called!");
  },

  async filter(title, array) {
    if (title === "Choose") {
      console.log("Normal order");
    } else if (title === "cab") {
      array.sort((a, b) => (a.cab > b.cab ? 1 : -1));
    } else if (true) {
      array.array.sort((a, b) => (a.title > b.title ? 1 : -1));
    }
  },
};
