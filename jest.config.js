const { defaults } = require("jest-config");
module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    ".(css|less|scss|sass)$": "identity-obj-proxy",
  },
  verbose: true,
};
