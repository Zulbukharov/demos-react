The UI should consist of three main sections:
An input box to let the user type in the text of a new todo item
A list of all the existing todo items
A footer section that shows the number of non-completed todos, and shows filtering options
Todo list items should have a checkbox that toggles their "completed" status. We should also be able to add a color-coded category tag for a predefined list of colors, and delete todo items.
The counter should pluralize the number of active todos: "0 items", "1 item", "3 items", etc
There should be buttons to mark all todos as completed, and to clear all completed todos by removing them
There should be two ways to filter the displayed todos in the list:
Filtering based on showing "All", "Active", and "Completed" todos
Filtering based on selecting one or more colors, and showing any todos whose tag that match those colors

{type: 'todos/todoAdded', payload: todoText}
{type: 'todos/todoToggled', payload: todoId}
{type: 'todos/colorSelected, payload: {todoId, color}}
{type: 'todos/todoDeleted', payload: todoId}
{type: 'todos/allCompleted'}
{type: 'todos/completedCleared'}
{type: 'filters/statusFilterChanged', payload: filterValue}
{type: 'filters/colorFilterChanged', payload: {color, changeType}}
