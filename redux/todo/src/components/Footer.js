import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  availableColors,
  StatusFilters,
  colorFilterChanged,
} from "../app/filters";

const StatusBox = ({ status, handleStatusSelect }) => {
  return (
    <div>
      <span className="text-gray-700">Filter by status</span>
      <div className="mt-2 flex flex-col">
        {Object.keys(StatusFilters).map((item, i) => (
          <label className="block inline-flex items-center" key={i}>
            <input
              type="radio"
              className="form-radio"
              value={StatusFilters[item]}
              name="status"
              checked={StatusFilters[item] === status}
              onChange={handleStatusSelect}
            />
            <span className="ml-2">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  const dispatcher = useDispatch();

  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = state.todos.entities.filter(
      (todo) => !todo.completed
    );
    return uncompletedTodos.length;
  });

  const handleStatusSelect = (e) =>
    dispatcher({
      type: "filters/statusFilterChanged",
      payload: e.target.value,
    });

  const handleColorsChange = (e) => {
    const {
      target: { value, checked },
    } = e;
    dispatcher(colorFilterChanged(value, checked));
  };

  const { status } = useSelector((state) => state.filters);
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
          <h4>{todosRemaining} items left</h4>
        </div>
        <StatusBox status={status} handleStatusSelect={handleStatusSelect} />
        <div>
          <span className="text-gray-700">Filter by Color</span>
          {availableColors.map((color, index) => (
            <div key={index}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={handleColorsChange}
                  value={color}
                />
                <span className="ml-2">{color}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
