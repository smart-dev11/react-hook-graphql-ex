import React, { useReducer, createContext } from "react";
import rootReducer from "../store/reducers";
import { global_state } from "../store/reducers";

const TodoContext = createContext();

function TodoContextProvider(props) {
  const [state, dispatch] = useReducer(rootReducer, global_state);
  const value = { state, dispatch };
  console.log("todoLists", state.todos.todoLists);
  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
}
export { TodoContext, TodoContextProvider };
