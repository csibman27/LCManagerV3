Handlebars.registerHelper("noop", function(options) {
  return options.fn(this);
});