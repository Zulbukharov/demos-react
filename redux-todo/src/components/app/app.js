import React from 'react';
import TodoList from '../todo-list';
import AddTodo from '../add-todo';
import Footer from '../footer';
import './app.css';

const App = () => {
	return (
		<main role="main" className="container">
			<div className="main-container">
				<div className="centered-header">
					<h2>
						Todo APP
					</h2>
				</div>
			</div>
			<AddTodo />
			<TodoList />
			<Footer />
		</main>
	)
};

export default App;