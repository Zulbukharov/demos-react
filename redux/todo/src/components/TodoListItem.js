import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { todosColorChanged } from "../app/todos";
import { availableColors } from "../app/filters";

const findTodoByID = (state, id) =>
  state.todos.entities.find((todo) => todo.id === id);

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => findTodoByID(state, id));
  const { text, completed } = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = () =>
    dispatch({ type: "todos/todoToogled", payload: id });

  const handleRemove = () =>
    dispatch({ type: "todos/todoRemove", payload: id });

  const handleColorChange = ({ target: { value } }) => {
    dispatch(todosColorChanged(todo.id, value));
  };

  return (
    <div className="border border-blue-500 shadow rounded-md p-4 w-full mx-auto">
      <div className="flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          {/* <div className="h-4 bg-blue-400 rounded w-3/4"></div> */}
          <div className="w-1/2">
            <p className="leading-6 font-medium text-black break-all">{text}</p>
          </div>
          <div className="w-1/2">
            <button
              onClick={handleCompletedChanged}
              className="bg-green-400 hover:bg-grey text-grey-darkest border-black font-bold py-2 px-4 rounded inline-flex"
            >
              <span>{completed ? "completed" : "complete"}</span>
            </button>
            <button
              onClick={handleRemove}
              className=" bg-red-400 hover:bg-grey text-grey-darkest border-black font-bold py-2 px-4 rounded inline-flex"
            >
              <span>Remove</span>
            </button>
            <select onChange={handleColorChange} defaultValue={todo.color}>
              <option value=""></option>
              {availableColors.map((color, i) => (
                <option value={color} key={i}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListItem;
