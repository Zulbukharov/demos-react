import { client } from "../api/client";
import { createSelector } from "reselect";
import { StatusFilters } from "./filters";

/*
Memoization is a kind of caching - specifically, 
saving the results of an expensive calculation, 
and reusing those results if we see the same inputs later.
*/

// Default state and data types
// id: a unique number
// text: the text the user typed in
// completed: a boolean flag
// color: An optional color category
const todoAppState = {
  status: "idle", // loading, succeded, failed
  entities: [],
};

// helper function to get last id
// const nextTodoID = (todos) =>
//   todos.reduce((maxId, todo) => Math.max(maxId, todo.id), -1) + 1;

// The FSA convention says that:

// If your action object has any actual data, that "data" value of your action should always go in action.payload
// An action may also have an action.meta field with extra descriptive data
// An action may have an action.error field with error information

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
// {type: 'todos/todoAdded', payload: todoText}
// {type: 'todos/todoToggled', payload: todoId}
// {type: 'todos/colorSelected, payload: {todoId, color}}
// {type: 'todos/todoDeleted', payload: todoId}
// {type: 'todos/allCompleted'}
// {type: 'todos/completedCleared'}
const todosReducer = (state = todoAppState, action) => {
  switch (action.type) {
    case "todos/todosLoading":
      return {
        ...state,
        status: "loading",
      };
    case "todos/todosLoaded":
      return {
        ...state,
        status: "idle",
        entities: action.payload,
      };
    case "todos/todoAdded":
      return {
        ...state,
        entities: [...state.entities, action.payload],
      };
    case "todos/todoToogled":
      return {
        ...state,
        entities: state.entities.map((todo) =>
          todo.id !== action.payload
            ? todo
            : { ...todo, completed: !todo.completed }
        ),
      };
    case "todos/colorSelected":
      return {
        ...state,
        entities: state.entities.map((todo) => {
          todo.color =
            todo.id === action.payload.todoId
              ? action.payload.color
              : todo.color;
          console.log(
            `1:${todo.color} 2:${todo.id} 3:${action.payload.todoId} 4:${action.payload.color}`
          );
          return todo;
        }),
      };
    case "todos/todoRemove":
      return {
        ...state,
        entities: state.entities.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

const fetchTodos = async (dispatch, getState) => {
  dispatch({ type: "todos/todosLoading" });
  const response = await client.get("/fakeApi/todos");
  console.log(response);
  dispatch({ type: "todos/todosLoaded", payload: response.todos });
};

const saveTodo = (text) => {
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

// will return list todo ids
const selectTodoIds = createSelector(
  (state) => state.todos,
  (todos) => todos.map((todo) => todo.id)
);

// will return list of filterd todos
const selectFilteredTodos = createSelector(
  (state) => state.todos.entities,
  (state) => state.filters,
  (todos, { status, colors }) => {
    const showAllCompletions = status === StatusFilters.All;
    if (showAllCompletions && colors.length === 0) {
      return todos;
    }

    const completedStatus = status === StatusFilters.Completed;
    // Return either active or completed todos based on filter
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus;
      const colorMatches = colors.length === 0 || colors.includes(todo.color);
      return statusMatches && colorMatches;
    });
  }
);

// will call selectFilteredTodos and return ids
const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
);

// action wrapper
const todosColorChanged = (todoId, color) => {
  console.log(todoId, color);
  return {
    type: "todos/colorSelected",
    payload: { todoId, color },
  };
};

const selectTodos = (state) => state.todos.entities;

export {
  fetchTodos,
  todosReducer,
  saveTodo,
  selectTodoIds,
  selectFilteredTodos,
  selectFilteredTodoIds,
  todosColorChanged,
  selectTodos,
};
