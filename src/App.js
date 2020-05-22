import React from 'react'
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import Footer from './components/Footer'
import { TodoContextProvider } from './contexts/todos';

const App = () => (
  <div className="container">
    <Header />
    <TodoContextProvider>
      <AddTodo />
      <TodoList />
      {/* <Footer /> */}
    </TodoContextProvider>

  </div>
)

export default App
