export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const CLEAR_TODO = 'CLEAR_TODO'
export const RESET_TODO = 'RESET_TODO'

export const initial_state = {
  todoLists: [],
  flag: true
};

const todosReducer = (state = initial_state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todoLists: [
          ...state.todoLists,
          {
            id: action.id,
            text: action.text,
            done: true
          }
        ]
      }
    case 'REMOVE_TODO': {
      const todoLists = state.todoLists.filter((todo) =>
        (todo.id !== action.id)
      )
      return {...state, todoLists}
    }
    case 'CLEAR_TODO':
      return {...state, todoLists: []}

    case 'RESET_TODO': {
      const todoLists = state.todoLists.map((todo) => {
        todo.done = false;
        return todo
      })
      console.log(todoLists)
      return {...state, todoLists}
    }
    default:
      return state
  }
}

export default todosReducer
