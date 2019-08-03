import React from 'react';

const Todo = ({ todo, toogleTodo }) => {
	return (
		<div onClick={toogleTodo}
			className="card">
			<div className="card-body" style={
				{
					backgroundColor: todo.completed ? '#d4edda' : '#fff3cd',
					textDecoration: todo.completed ? 'line-through' : 'none'
				}
			}>
				{todo.title}
			</div>
		</div>
	)
}

export default Todo;