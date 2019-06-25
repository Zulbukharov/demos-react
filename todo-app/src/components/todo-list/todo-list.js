import React from 'react';
import TodoListItem from '../todo-list-item'
import './todo-list.css'

const TodoList = ({ todos, onDeleted, onToggleDone, onToggleImportant }) => {
	const elements = todos.map((item) => {
		// деструктурировать в переменную id = item.id, 
		// а все остальное в itemProps
		const { id, ...itemProps } = item;
		return (
			<li key={id} className="list-group-item">
				<TodoListItem {...itemProps}
					onDeleted={() => {
						onDeleted(id);
					}}
					onToggleImportant={() => {
						onToggleImportant(id);
					}}
					onToggleDone={() => {
						onToggleDone(id);
					}}
				// label={item.label}
				// important={item.important}
				/>
			</li>
		);
	});
	return (
		<ul className="list-group todo-list">
			{elements}
		</ul>
	);
};

export default TodoList;