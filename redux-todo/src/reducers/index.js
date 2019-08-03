const initialState = {
	todos: [],
	filter: 'SHOW_ALL',
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TODO': {
			const newTodo = {
				id: state.todos.length,
				title: action.payload,
				completed: false,
			}
			return {
				...state,
				todos: [...state.todos, newTodo]
			};
		}
		case 'TOOGLE_TODO': {
			const newTodos = state.todos.map((todo) => {
				if (todo.id === action.payload) {
					return {
						...todo,
						completed: !todo.completed,
					}
				}
				else {
					return todo;
				}
			})
			return {
				...state,
				todos: newTodos
			}
		}
		case 'SET_FILTER': {
			console.log(action.payload);
			return {
				...state,
				filter: action.payload
			}
		}
		default:
			return state;
	}
}

export default reducer;