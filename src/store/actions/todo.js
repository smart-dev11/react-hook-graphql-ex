import * as types from "./types";

export const getTodos = (data) => ({
  type: types.GET_TODOS,
  payload: data,
});

export const addTodo = (data) => ({
  type: types.ADD_TODO,
  payload: data,
});

export const updateTodo = (data) => ({
  type: types.UPDATE_TODO,
  payload: data,
});

export const removeTodo = (id) => ({
  type: types.REMOVE_TODO,
  payload: id,
});

export const clearTodo = () => ({
  type: types.CLEAR_TODO,
});

export const resetTodo = () => ({
  type: types.RESET_TODO,
});
