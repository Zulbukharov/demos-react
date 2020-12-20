import React from "react";

const TodoListItem = ({ todo }) => {
  const { id, text, completed } = todo;
  return (
    <p>
      {id} {text} {completed}
    </p>
  );
};

export default TodoListItem;
