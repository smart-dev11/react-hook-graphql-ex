"use strict";
const Todo = require("../../models/todo");

const createTodo = async (_, { content }, context) => {
  try {
    var todo = new Todo({ content: content });
    await todo.save();
    return todo;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteTodo = async (_, { _id }, context) => {
  try {
    await Todo.findByIdAndRemove(_id);
    return {
      success: true,
      message: "Todo is deleted successfully",
    };
  } catch (err) {
    throw new Error(err);
  }
};

const updateTodo = async (parent, args, context) => {
  try {
    const todo = await Todo.findById(args._id);
    todo.content = args.content;
    await todo.save();

    return todo;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createTodo,
  deleteTodo,
  updateTodo,
};
