"use strict";
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
