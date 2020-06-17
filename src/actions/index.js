let nextTodoId = 0

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const CLEAR_TODO = 'CLEAR_TODO'
export const RESET_TODO = 'RESET_TODO'

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})


export const removeTodo = id => ({
  type: 'REMOVE_TODO',
  id: id,
})

export const clearTodo = () => ({
  type: 'CLEAR_TODO'
})

export const resetTodo = () => ({
  type: 'RESET_TODO'
})