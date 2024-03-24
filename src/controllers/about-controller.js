// eslint-disable-next-line import/no-extraneous-dependencies
import Chart from "chart.js/auto";
import { analytics } from "../utils/analytics.js";
import { db } from "../models/db.js";

export const aboutController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const loggedInUserInitials = loggedInUser.firstName[0] + loggedInUser.lastName[0];
      const date = new Date().getFullYear();
      const dateMinusOne = new Date().getFullYear() - 1;
      const dateMinusTwo = new Date().getFullYear() - 2;
      const dateMinusThree = new Date().getFullYear() - 3;
      const serverDates = [];
      const allServer = await db.serverStore.getAllServers();
      for (let i = 0; i < allServer.length; i += 1) {
        const dates = allServer[i].date;
        serverDates.push(dates);
      }
      // This year
      const serversAddedThisYear = await analytics.filterDatesByThisYear(serverDates);
      const serversAddedThisYearGraph = await analytics.filterDatesByThisYear(serverDates);
      const valueXThisYear = serversAddedThisYearGraph * 10;
      // Last Year
      const serversAddedLastYear = await analytics.filterDatesByLastYear(serverDates);
      const serversAddedLastYearGraph = await analytics.filterDatesByLastYear(serverDates);
      const valueXLastYear = serversAddedLastYearGraph * 10;
      // Year Minus Two
      const serversAddedYearMinusTwo = await analytics.filterDatesByYearMinusTwo(serverDates);
      const serversAddedYearMinusTwoGraph = await analytics.filterDatesByYearMinusTwo(serverDates);
      const valueXYearMinusTwo = serversAddedYearMinusTwoGraph * 10;
      // Year Minus Three
      const serversAddedYearMinusThree = await analytics.filterDatesByYearMinusThree(serverDates);
      const serversAddedYearMinusThreeGraph = await analytics.filterDatesByYearMinusThree(serverDates);
      const valueXYearMinusThree = serversAddedYearMinusThreeGraph * 10;
      // barchart2

      // Define how many servers are purchased this year
      const thisQuarter = [];
      for (let i = 0; i < allServer.length; i += 1) {
        const purchaseDate = allServer[i].pdate;
        const serversDate = new Date(purchaseDate);
        if (serversDate.getFullYear() === date) {
          const thisYearsMachines = serversDate.getMonth() + 1; // months starts with 1
          if (thisYearsMachines > 0 && thisYearsMachines <= 2) {
            thisQuarter.push(thisYearsMachines);
          }
        }
      }

      const company = "[Company name]";
      // const data = await analytics.pieChartA();
      const viewData = {
        title: "Data Analysis",
        date,
        dateMinusOne,
        dateMinusTwo,
        dateMinusThree,
        company,
        loggedInUserInitials,
        serversAddedThisYear,
        valueXThisYear,
        serversAddedLastYear,
        valueXLastYear,
        serversAddedYearMinusTwo,
        valueXYearMinusTwo,
        serversAddedYearMinusThree,
        valueXYearMinusThree,
        thisQuarter,
        // data,
      };
      return h.view("about-view", viewData);
    },
  },
};
