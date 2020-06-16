import React from "react";
import Header from "../components/Todo/Header";
import AddTodo from "../components/Todo/AddTodo";
import TodoList from "../components/Todo/TodoList";
import Footer from "../components/Todo/Footer";
import { TodoContextProvider } from "../contexts/todos";

const App = () => (
  <div className="container">
    <Header />
    <TodoContextProvider>
      <AddTodo />
      <TodoList />
      {/* <Footer /> */}
    </TodoContextProvider>
  </div>
);

export default App;
