import React from "react";
import { useSelector } from "react-redux";

import { availableColors, capitalize, StatusFilters } from "../app/filters";

const Footer = () => {
  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = state.todos.filter((todo) => !todo.completed);
    return uncompletedTodos.length;
  });

  const { status, colors } = useSelector((state) => state.filters);

  console.log(availableColors, StatusFilters);
  return (
    <footer>
      <div className="flex justify-between">
        <div>
          <h5>Actions</h5>
          <button className="button">Mark all completed</button>
          <button className="button">Clear completed</button>
        </div>
        <div>
          <h3>Remaining Todos</h3>
          <h4>{todosRemaining}</h4>
        </div>
        <div>
          <h3>Filter by status</h3>
          {Object.keys(StatusFilters).map((s, i) => (
            <h4 key={i}>{s}</h4>
          ))}
        </div>
        <div>
          <h3>Filter by Color</h3>
          {availableColors.map((color, index) => (
            <h5 key={index}>{color}</h5>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
