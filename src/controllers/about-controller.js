export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About LCManager",
      };
      return h.view("about-view", viewData);
    },
  },
};
