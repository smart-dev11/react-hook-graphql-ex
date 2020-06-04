import { combineReducers } from "redux";
import todosReducer from "./todos";
import { routerReducer } from "react-router-redux";

const todos_initial_state = {
  todoLists: [],
  flag: true,
};

export const global_state = {
  todos: todos_initial_state,
};

const rootReducer = combineReducers({
  todos: todosReducer,
  routing: routerReducer,
});

export default rootReducer;
