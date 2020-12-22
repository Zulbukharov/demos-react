import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { todosColorChanged } from "../app/todos";
import { availableColors } from "../app/filters";

const findTodoByID = (state, id) => state.todos.find((todo) => todo.id === id);

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
    <li>
      <span className="group block rounded-lg p-4 border border-gray-200">
        <dl className="grid sm:block lg:grid xl:block grid-cols-3 grid-rows-1 items-center">
          <dd className="leading-6 font-medium text-black break-all">{text}</dd>
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
          {/* <div onClick={handleCompletedChanged}>
            <dt className="sr-only">Done</dt>
            <dd className=" text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4">
              {completed ? "completed " : "!completed "}
            </dd>
          </div> */}
          {/* <div onClick={handleRemove}>Delete</div> */}
        </dl>
      </span>
    </li>
  );
};

export default TodoListItem;
