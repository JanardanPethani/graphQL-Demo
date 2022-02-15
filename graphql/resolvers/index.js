const bookingResolver = require("./booking");
const userResolver = require("./user");
const eventResolver = require("./event");

const rootResolver = {
  ...bookingResolver,
  ...eventResolver,
  ...userResolver,
};

module.exports = rootResolver;
