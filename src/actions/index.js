export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const CLEAR_TODO = 'CLEAR_TODO'
export const RESET_TODO = 'RESET_TODO'
export const GET_TODOS = 'GET_TODOS'
export const UPDATE_TODO = 'UPDATE_TODO'

export const getTodos = data => ({
  type: 'GET_TODOS',
  payload: data
})

export const addTodo = data => ({
  type: 'ADD_TODO',
  payload: data
})

export const removeTodo = id => ({
  type: 'REMOVE_TODO',
  _id: id,
})

export const clearTodo = () => ({
  type: 'CLEAR_TODO'
})

export const resetTodo = () => ({
  type: 'RESET_TODO'
})
