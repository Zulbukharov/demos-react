import React from "react";

import { useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";
import { selectFilteredTodoIds } from "../app/todos";

const TodoList = () => {
  const todosIDs = useSelector(selectFilteredTodoIds); // subscribe to changes
  const renderedListItems = todosIDs.map((id) => (
    <TodoListItem key={id} id={id} />
  ));

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-2">
      {renderedListItems}
    </ul>
  );
};

export default TodoList;
