import React from "react";

import Header from "./Header";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";
import { TodoContextProvider } from "../../contexts/todos";

const Todo = () => (
  <div className="container">
    <Header />
    {/* <TodoContextProvider> */}
    <AddTodo />
    <TodoList />
    {/* <Footer /> */}
    {/* </TodoContextProvider> */}
  </div>
);

export default Todo;
