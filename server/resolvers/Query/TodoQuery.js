"use strict";
const Todo = require("../../models/todo");

const getTodos = async (parent, args, context) => {
  try {
    const todos = await Todo.find().lean();
    return todos;
  } catch (err) {
    throw new Error(err);
  }
};

const todo = async (parent, { _id }, context) => {
  try {
    const todo = await Todo.findById(_id).lean();
    return todo;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getTodos,
  todo,
};
