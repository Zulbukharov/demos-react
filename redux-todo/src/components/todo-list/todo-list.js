import React from 'react';
import { connect } from 'react-redux';
import Todo from '../todo';
import { toogleTodo } from '../../actions';
import './todo-list.css';

const TodoList = ({ todos, toogleTodo }) => {
	return (
		<div className="todo-list">
			{
				todos.map((todo) => {
					return (
						<div className="todo-list-item" key={todo.id}>
							<Todo
								todo={todo}
								toogleTodo={() => toogleTodo(todo.id)} />
						</div>
					);
				})
			}
		</div>
	)
}

const filterTodos = (todos, filter) => {
	switch (filter) {
		case 'SHOW_ALL': {
			return todos;
		}
		case 'ON_ACTIVE': {
			const d = todos.filter((todo) => todo.completed === false);
			console.log(d)
			return d
		}
		case 'ON_COMPLETED': {
			return todos.filter((todo) => todo.completed === true);
		}
		default:
			return todos
	}
}

const mapStateToProps = ({ todos, filter }) => {
	return {
		todos: filterTodos(todos, filter),
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		toogleTodo: (id) => dispatch(toogleTodo(id)),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
