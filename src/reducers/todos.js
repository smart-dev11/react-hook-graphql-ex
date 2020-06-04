export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const CLEAR_TODO = "CLEAR_TODO";
export const RESET_TODO = "RESET_TODO";
export const GET_TODOS = "GET_TODOS";
export const UPDATE_TODO = "UPDATE_TODO";

export const initial_state = {
  todoLists: [],
  flag: true,
};

const todosReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todoLists: action.payload,
      };
    case "ADD_TODO":
      return {
        ...state,
        todoLists: state.todoLists.concat(action.payload),
      };
    case "REMOVE_TODO": {
      const todoLists = state.todoLists.filter(
        (todo) => todo._id !== action.payload
      );
      return { ...state, todoLists };
    }
    case "UPDATE_TODO": {
      const newtodoLists = state.todoLists.map((todo) => {
        if (todo._id === action.payload._id) {
          todo.content = action.payload.content;
        }
        return todo;
      });
      console.log(111, newtodoLists);
      return { ...state, todoLists: newtodoLists };
    }
    case "CLEAR_TODO":
      return { ...state, todoLists: [] };

    case "RESET_TODO": {
      const todoLists = state.todoLists.map((todo) => {
        todo.done = false;
        return todo;
      });
      return { ...state, todoLists };
    }
    default:
      return state;
  }
};

export default todosReducer;
