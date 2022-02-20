import React, { useState } from "react";
import Card from "components/Card";
import TodoForm from "components/TodoForm";
import TodoList from "components/TodoList";
import { TodoContext } from "store/TodoContext";
import { ITodos } from "types";

const App = () => {
  const [todoContext, setTodosContext] = useState<ITodos[]>([]);
  return (
    <div className="container">
      <div className="content">
        <TodoContext.Provider value={{ todoContext, setTodosContext }}>
          <Card>
            <TodoForm />
          </Card>
          <TodoList />
        </TodoContext.Provider>
      </div>
    </div>
  );
};

export default App;
