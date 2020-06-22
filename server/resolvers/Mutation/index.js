"use strict";
const TodoMutation = require("./TodoMutation");
const AuthMutation = require("./AuthMutation");

module.exports = {
  ...TodoMutation,
  ...AuthMutation,
};
