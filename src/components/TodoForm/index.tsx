import React, { FC, useContext, useEffect } from "react";
import { TodoContext } from "store/TodoContext";
import Button from "components/Button";
import Input from "components/Input";
import { getAllTodo, postTodo } from "services";
import { ITodos } from "types";
import "./styled.scss";

const TodoForm: FC = () => {
  const { todoContext, setTodosContext } = useContext(TodoContext);

  useEffect(() => {
    (async () => {
      await getTodo();
    })();
  }, []);

  const getTodo = async () => {
    try {
      let response = await getAllTodo();
      setTodosContext(response);
    } catch (e) {
      console.log("Error");
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    let value = e.target[0].value;
    if (!value) return alert("Please write something.");
    const newTodo = { id: Math.random(), title: value, isCompleted: false };
    try {
      const post = await postTodo(newTodo);
      const { data } = post;
      const newTodos: ITodos[] = [...todoContext, data];
      setTodosContext(newTodos);
      e.target[0].value = "";
    } catch (e) {
      console.log("Error");
    }
  };

  return (
    <form onSubmit={addTodo}>
      <div>
        <Input name="input" label="Todo Name" placeholder="Add Todo" />
        <Button type="submit">Please add your precious to dos...</Button>
      </div>
    </form>
  );
};

export default TodoForm;
