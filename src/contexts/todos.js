import React, { useReducer, createContext } from "react";
import rootReducer from "../reducers";
import { global_state } from "../reducers";

const TodoContext = createContext();

function TodoContextProvider(props) {
  const [state, dispatch] = useReducer(rootReducer, global_state);
  const value = { state, dispatch };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
}
export { TodoContext, TodoContextProvider };
