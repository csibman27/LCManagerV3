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
      const data = await analytics.pieChartA();
      const mass = new Chart({
        type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
          labels: ["R1", "R2", "S22", "Popper"],
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
      const viewData = {
        title: "Data Analysis",
        date,
        company,
        loggedInUserInitials,
        data,
        mass,
      };
      return h.view("about-view", viewData);
    },
  },
};
