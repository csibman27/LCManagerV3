// eslint-disable-next-line import/no-extraneous-dependencies
import { db } from "../models/db.js";
// eslint-disable-next-line import/no-extraneous-dependencies

const currentDate = new Date();

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
    const days = [];
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
      return `${diffInDays} days`;
    }
    return `${daysToYear.toFixed(1)} years`;
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
    const providedDate = new Date(pdate);

    const timeDiff = currentDate.getTime() - providedDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff <= 1095) {
      return "pie"; // Date is within the first 3 years
    }
    if (daysDiff > 1095 && daysDiff <= 1825) {
      return "pie-2"; // Date is between 3-5 years
    }
    if (daysDiff > 1825 && daysDiff <= 2555) {
      return "pie-3"; // Date is between 5-7 years
    }
    if (daysDiff > 2555 && daysDiff <= 3650) {
      return "pie-4"; // Date is between 7-10 years
    }
    return "pie-5"; // Date is more than 10 years old
  },

  // support check for servers
  async supportCheckServer(supportDate) {
    const inputDate = new Date(supportDate);

    if (currentDate.getTime() > inputDate.getTime()) {
      return "Support date has expired. Please renew or update the support.";
    } else {
      return "Support date is still valid. No action needed.";
    }
  },

  // support expiration tracker
  async supportCheck(supportDate) {
    const supportEndDate = new Date(supportDate);

    if (currentDate > supportEndDate) {
      return " Support has already expired.";
    }
    const timeDiff = supportEndDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff <= 180) {
      return ` Warning: Support will expire in ${daysDiff} days.`;
    }
    return;
  },

  async serverYearlyExpenseEstimate(server) {
    let { cost } = server;
    cost *= 0.06;
    return cost;
  },

  async serverPowerUsageEstimation(servers) {
    const power = servers * 0.75;
    const quarterly = power * 2184;
    return quarterly;
  },

  async sum(maintenancecost, y) {
    return maintenancecost + y;
  },

  async sub(maintenancecost, y) {
    return maintenancecost - y;
  },

  // chart analysis
  async pieChartA() {
    return new Chart("myChart", {
      type: "bar",
      data: {
        labels: ["R720-1", "R720-2", "Server2222", "SAN"],
        datasets: [
          {
            label: "Services",
            data: [123213, 123213, 1234124, 4213342],
            // backgroundColor:"green"
            backgroundColor: ["green", "red", "yellow"],
          },
        ],
      },
      options: {},
    });
  },

  async filterDatesByThisYear(dateArray) {
    const currentYear = currentDate.getFullYear();
    const filteredDates = dateArray.filter((date) => {
      const inputDate = new Date(date);
      return inputDate.getFullYear() === currentYear;
    });
    return filteredDates.length;
  },

  async filterDatesByLastYear(dateArray) {
    const currentYear = currentDate.getFullYear() - 1;
    const filteredDates = dateArray.filter((date) => {
      const inputDate = new Date(date);
      return inputDate.getFullYear() === currentYear;
    });
    return filteredDates.length;
  },

  async filterDatesByYearMinusTwo(dateArray) {
    const currentYear = currentDate.getFullYear() - 2;
    const filteredDates = dateArray.filter((date) => {
      const inputDate = new Date(date);
      return inputDate.getFullYear() === currentYear;
    });
    return filteredDates.length;
  },

  async filterDatesByYearMinusThree(dateArray) {
    const currentYear = currentDate.getFullYear() - 3;
    const filteredDates = dateArray.filter((date) => {
      const inputDate = new Date(date);
      return inputDate.getFullYear() === currentYear;
    });
    return filteredDates.length;
  },
};
