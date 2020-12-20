import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import TodoListItem from "./TodoListItem";

const selectTodos = (state) => state.todos.map((todo) => todo.id); // out function to work with data

const TodoList = () => {
  // React-Redux has a shallowEqual comparison function we can use to check if the items inside the array are still the same.
  const todosIDs = useSelector(selectTodos, shallowEqual); // subscribe to changes

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
