export const aboutController = {
  index: {
    handler: function (request, h) {
      const date = new Date().getFullYear();
      const company = "[Company name]";
      const viewData = {
        title: "About LCManager",
        date,
        company,
      };
      return h.view("about-view", viewData);
    },
  },
};
