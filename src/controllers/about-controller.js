export const aboutController = {
  index: {
    handler: function (request, h) {
      const loggedInUser = request.auth.credentials;
      const loggedInUserInitials = loggedInUser.firstName[0] + loggedInUser.lastName[0];
      const date = new Date().getFullYear();
      const company = "[Company name]";
      const viewData = {
        title: "About LCManager",
        date,
        company,
        loggedInUserInitials,
      };
      return h.view("about-view", viewData);
    },
  },
};
