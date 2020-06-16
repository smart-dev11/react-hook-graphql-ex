export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const CLEAR_TODO = "CLEAR_TODO";
export const RESET_TODO = "RESET_TODO";
export const GET_TODOS = "GET_TODOS";
export const UPDATE_TODO = "UPDATE_TODO";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const getTodos = (data) => ({
  type: "GET_TODOS",
  payload: data,
});

export const addTodo = (data) => ({
  type: "ADD_TODO",
  payload: data,
});

export const updateTodo = (data) => ({
  type: "UPDATE_TODO",
  payload: data,
});

export const removeTodo = (id) => ({
  type: "REMOVE_TODO",
  payload: id,
});

export const clearTodo = () => ({
  type: "CLEAR_TODO",
});

export const resetTodo = () => ({
  type: "RESET_TODO",
});

export const loginSuccess = (data) => ({
  type: "LOGIN_SUCCESS",
  payload: data,
});

export const registerSuccess = (data) => ({
  type: "REGISTER_SUCCESS",
  payload: data,
});
