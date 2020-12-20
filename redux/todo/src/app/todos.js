import { client } from "../api/client";

// Default state and data types
// id: a unique number
// text: the text the user typed in
// completed: a boolean flag
// color: An optional color category
const todoAppState = [];

// helper function to get last id
// const nextTodoID = (todos) =>
//   todos.reduce((maxId, todo) => Math.max(maxId, todo.id), -1) + 1;

// Actions
// Add a new todo entry based on the text the user entered
// Toggle the completed status of a todo
// Select a color category for a todo
// Delete a todo
// Mark all todos as completed
// Clear all completed todos
// Choose a different "completed" filter value
// Add a new color filter
// Remove a color filter
const todosReducer = (state = todoAppState, action) => {
  switch (action.type) {
    case "todos/todoAdded":
      return [...state, action.payload];
    case "todos/todoToogled":
      return state.map((todo) =>
        todo.id !== action.payload
          ? todo
          : { ...todo, completed: !todo.completed }
      );
    case "todos/todoRemove":
      return state.filter((todo) => todo.id !== action.payload);
    case "todos/todosLoaded":
      return action.payload;
    default:
      return state;
  }
};

const fetchTodos = async (dispatch, getState) => {
  const response = await client.get("/fakeApi/todos");
  console.log(response);
  dispatch({ type: "todos/todosLoaded", payload: response.todos });
};

const saveTodo = (text) => {
  console.log("ok");
  const saveNewTodoThunk = async (dispatch, getState) => {
    const initialsTodo = { text };
    const response = await client.post("/fakeApi/todos", {
      todo: initialsTodo,
    });
    console.log(response);
    dispatch({ type: "todos/todoAdded", payload: response.todo });
  };
  return saveNewTodoThunk;
};

export { fetchTodos, todosReducer, saveTodo };
