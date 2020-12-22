import React from "react";

import { useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";
import { selectFilteredTodoIds } from "../app/todos";

const TodoList = () => {
  const todosIDs = useSelector(selectFilteredTodoIds); // subscribe to changes
  const loadingStatus = useSelector((state) => state.todos.status);

  console.log(loadingStatus);
  if (loadingStatus === "loading") {
    return (
      <div className="border border-blue-500 shadow rounded-md p-4 w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-blue-400 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-blue-400 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-blue-400 rounded"></div>
              <div className="h-4 bg-blue-400 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderedListItems = todosIDs.map((id) => (
    <TodoListItem key={id} id={id} />
  ));

  return (
    // <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-2">
    <>{renderedListItems}</>
    // </ul>
  );
};

export default TodoList;
