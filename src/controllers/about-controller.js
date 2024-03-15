// eslint-disable-next-line import/no-extraneous-dependencies
import Chart from "chart.js/auto";
import { analytics } from "../utils/analytics.js";

export const aboutController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const loggedInUserInitials = loggedInUser.firstName[0] + loggedInUser.lastName[0];
      const date = new Date().getFullYear();
      const company = "[Company name]";
      // const data = await analytics.pieChartA();
      const viewData = {
        title: "Data Analysis",
        date,
        company,
        loggedInUserInitials,
        // data,
      };
      return h.view("about-view", viewData);
    },
  },
};
