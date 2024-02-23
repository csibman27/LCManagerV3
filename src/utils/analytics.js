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

  // determine the age of server
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

  // sorted lists analytics
  async filter(array, orderBy) {
    // const orderBy = "cabnum";
    let sortedData = [];
    if (orderBy === "az") {
      sortedData = array.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else if (orderBy === "za") {
      sortedData = array.sort((a, b) => (a.title < b.title ? 1 : -1));
    } else if (orderBy === "cabnum") {
      sortedData = array.sort((a, b) => (a.cab > b.cab ? 1 : -1));
    } else {
      sortedData = array;
    }

    return sortedData;
  },

  // get progress chart function
  async progressPie(pdate) {
    const currentDate = new Date();
    const providedDate = new Date(pdate);

    const timeDiff = currentDate.getTime() - providedDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff <= 1095) {
      return "pie"; // Date is within the first 3 years
    } else if (daysDiff > 1095 && daysDiff <= 1825) {
      return "pie-2"; // Date is between 3-5 years
    } else if (daysDiff > 1825 && daysDiff <= 2555) {
      return "pie-3"; // Date is between 5-7 years
    } else if (daysDiff > 2555 && daysDiff <= 3650) {
      return "pie-4"; // Date is between 7-10 years
    } else {
      return "pie-5"; // Date is more than 10 years old
    }
  },
};
