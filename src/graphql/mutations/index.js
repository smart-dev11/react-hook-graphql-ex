"use strict";
const TodoMutation = require("./todo");
const AuthMutation = require("./auth");

module.exports = {
  ...TodoMutation,
  ...AuthMutation,
};
