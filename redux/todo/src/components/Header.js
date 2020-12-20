import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { saveTodo } from "../app/todos";

const Header = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch(); // create dispatcher, that will call reducer

  const handleChange = (e) => setText(e.target.value);

  const handleKeyDown = (e) => {
    const trimmedText = e.target.value.trim();
    if (e.which === 13 && trimmedText) {
      saveTodo(trimmedText);
      const saveTodoThunk = saveTodo(trimmedText);
      dispatch(saveTodoThunk);
      setText("");
    }
  };

  return (
    <>
      <header className="flex items-center justify-between">
        <h2 className="text-lg leading-6 font-medium text-black">Todos</h2>
      </header>
      <form className="relative" onSubmit={(e) => e.preventDefault()}>
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"
          />
        </svg>
        <input
          className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
          type="text"
          aria-label="what needs to be done"
          placeholder="what needs to be done"
          autoFocus={true}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </>
  );
};

export default Header;
