import React, { FC, useContext, useState } from "react";
import "./styled.scss";
import { ITodos } from "types";
import { TodoContext } from "store/TodoContext";
import { deleteTodo, updateTodo } from "services/index";

const TodoList: FC = () => {
  const { todoContext, setTodosContext } = useContext(TodoContext);

  const toggleTask = async (item) => {
    try {
      const data = await updateTodo(item).then((res) => res.data);
      setTodosContext((prev) =>
        prev.map((todo) => {
          if (data.id === todo.id) {
            return { ...todo, isCompleted: data.isCompleted };
          }
          return todo;
        })
      );
    } catch (e) {
      console.log("Error", e);
    }
  };

  const todoDelete = async (id) => {
    try {
      await deleteTodo(id);
      const removeItem = todoContext.filter((todo) => {
        return todo.id !== id;
      });
      setTodosContext(removeItem);
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <div>
      {!!todoContext.length && (
        <div className="list-box">
          <ul className="situation">
            <li>Precious todo name</li>
            <li>Situation</li>
            <li>Delete your precious</li>
          </ul>
          {todoContext.map((item: ITodos) => {
            const { id, title, isCompleted } = item;
            return (
              <ul key={id}>
                <li>{title}</li>
                <li
                  className={isCompleted ? "done" : "not-done"}
                  onClick={() => toggleTask(item)}
                >
                  {isCompleted ? "Done" : "Not Done"}
                </li>
                <li onClick={() => todoDelete(id)}>Delete</li>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default TodoList;
