import * as types from "../actions/types";

export const initial_state = {
  todoLists: [],
  flag: true,
};

const todosReducer = (state = initial_state, action) => {
  switch (action.type) {
    case types.GET_TODOS:
      return {
        ...state,
        todoLists: action.payload,
      };
    case types.ADD_TODO:
      return {
        ...state,
        todoLists: state.todoLists.concat(action.payload),
      };
    case types.REMOVE_TODO: {
      const newState = Object.assign({}, state);
      const todoLists = newState.todoLists.filter(
        (todo) => todo._id !== action.payload
      );
      return { ...state, todoLists };
    }
    case types.UPDATE_TODO: {
      const newState = Object.assign({}, state);
      const newtodoLists = newState.todoLists.map((todo) => {
        if (todo._id === action.payload._id) {
          todo.content = action.payload.content;
        }
        return todo;
      });
      return { ...state, todoLists: newtodoLists };
    }
    case types.CLEAR_TODO:
      return { ...state, todoLists: [] };

    case types.RESET_TODO: {
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
