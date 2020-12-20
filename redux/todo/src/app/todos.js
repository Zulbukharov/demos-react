// Default state and data types
// id: a unique number
// text: the text the user typed in
// completed: a boolean flag
// color: An optional color category
const todoAppState = [
  { id: 1, text: "Learn React", completed: true },
  { id: 2, text: "Learn Redux", completed: false, color: "purple" },
];

// helper function to get last id
const nextTodoID = (todos) =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo.id), -1) + 1;

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
    case "todos/todoAdded": {
      return [
        ...state,
        {
          id: nextTodoID(state),
          text: action.payload,
          completed: false,
        },
      ];
    }
    case "todos/todoToogled":
      return state.map((todo) =>
        todo.id !== action.payload
          ? todo
          : { ...todo, completed: !todo.completed }
      );
    default:
      return state;
  }
};

export default todosReducer;
