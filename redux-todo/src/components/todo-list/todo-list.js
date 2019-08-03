import React from 'react';
import { connect } from 'react-redux';
import Todo from '../todo';

const TodoList = ({ todos }) => {
	console.log(todos)
	return (
		<ul>
			{
				todos.map((todo) => {
					return (
						<li key={todo.id}>
							<Todo todo={todo} />
						</li>);
				})
			}
		</ul>
	)
}

const mapStateToProps = ({ todos }) => {
	return {
		todos: todos
	}
};


export default connect(mapStateToProps)(TodoList);
