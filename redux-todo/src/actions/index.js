// const todosLoaded = (todos)
const addTodo = (value) => {
	return {
		type: 'ADD_TODO',
		payload: value,
	}
}

const toogleTodo = (id) => {
	console.log(id);
	return {
		type: 'TOOGLE_TODO',
		payload: id,
	}
}

const setFilter = (filter) => {
	return {
		type: 'SET_FILTER',
		payload: filter,
	}
}

export {
	addTodo,
	toogleTodo,
	setFilter,
}