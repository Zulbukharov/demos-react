import React from "react";
import { useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";

const selectTodos = (state) => state.todos; // out function to work with data

const TodoList = () => {
  const todos = useSelector(selectTodos); // subscribe to changes
  console.log("todos", todos);

  const renderedListItems = todos.map((todo) => (
    <TodoListItem key={todo.id} todo={todo} />
  ));

  return <div>{renderedListItems}</div>;
};

export default TodoList;
