import React from "react";
import { useSelector, useDispatch } from "react-redux";

const findTodoByID = (state, id) => state.todos.find((todo) => todo.id === id);

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => findTodoByID(state, id));
  const { text, completed } = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = () =>
    dispatch({ type: "todos/todoToogled", payload: id });

  const handleRemove = () =>
    dispatch({ type: "todos/todoRemove", payload: id });

  return (
    <li>
      <span className="group block rounded-lg p-4 border border-gray-200">
        <dl className="grid sm:block lg:grid xl:block grid-cols-3 grid-rows-1 items-center">
          <div>
            <dt className="sr-only">Text</dt>
            <dd className="leading-6 font-medium text-black md:text-center break-all">
              {text}
            </dd>
          </div>
          <div onClick={handleCompletedChanged}>
            <dt className="sr-only">Done</dt>
            <dd className=" text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4">
              {completed ? "completed " : "!completed "}
            </dd>
          </div>
          <div onClick={handleRemove}>Delete</div>
        </dl>
      </span>
    </li>
  );
};

export default TodoListItem;
