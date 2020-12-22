import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { saveTodo } from "../app/todos";

const Header = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch(); // create dispatcher, that will call reducer

  const handleChange = (e) => setText(e.target.value);

  const handleKeyDown = async (e) => {
    const trimmedText = e.target.value.trim();
    if (e.which === 13 && trimmedText) {
      setStatus("loading");
      saveTodo(trimmedText);
      const saveTodoThunk = saveTodo(trimmedText);
      await dispatch(saveTodoThunk);
      setText("");
      setStatus("idle");
    }
  };

  const isLoading = status === "loading";
  let placeholder = isLoading ? "" : "what need to be done";
  let loader = isLoading ? <div className="lds-dual-ring"></div> : null;

  return (
    <>
      <header className="flex items-center justify-between">
        <h2 className="text-lg leading-6 font-medium text-black">Todos</h2>
      </header>
      <form className="relative" onSubmit={(e) => e.preventDefault()}>
        <div className="flex">
          <div className="w-full">
            <input
              className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
              type="text"
              aria-label="what needs to be done"
              placeholder={placeholder}
              autoFocus={true}
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
          </div>
          <div>{loader}</div>
        </div>
      </form>
    </>
  );
};

export default Header;
