import React from "react";
// import { useSelector } from "react-redux";

// import { availableColors, capitalize, StatusFilters } from "../app/filters";

const Footer = () => {
  //   const todosRemaining = useSelector((state) => {
  //     const uncompletedTodos = state.todos.filter((todo) => !todo.completed);
  //     return uncompletedTodos.length;
  //   });

  //   const { status, colors } = useSelector((state) => state.filters);

  return (
    <footer>
      <div className="actions">
        <h5>Actions</h5>
        <button className="button">Mark all completed</button>
        <button className="button">Clear completed</button>
      </div>
    </footer>
  );
};

export default Footer;
