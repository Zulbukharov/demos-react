import React, { Component } from 'react';
import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item'
import './app.css'

export default class App extends Component {
	constructor() {
		super();
		this.maxId = 4;
		this.state = {
			todoData: [
				this.createTodoItem("Drink Cofee"),
				this.createTodoItem("Create React App"),
				this.createTodoItem("Have a lunch")
			],
			filter: 'all',
			search: ''
		}
	};

	createTodoItem = (label) => {
		const newItem = {
			label: label,
			important: false,
			done: false,
			id: this.maxId++
		};
		return newItem;
	}

	deleteItem = (id) => {
		console.log(id);
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);
			todoData.slice(idx, 1);

			const before = todoData.slice(0, idx);
			const after = todoData.slice(idx + 1);
			const newArray = [...before, ...after];
			return {
				todoData: newArray
			};
		});
	}

	addItem = (label) => {
		console.log("add item")
		this.setState(({ todoData }) => {
			const newArray = [...todoData, this.createTodoItem(label)];
			return {
				todoData: newArray
			};
		});
	}

	toggleProperty = (arr, id, propName) => {
		// find elem
		const idx = arr.findIndex((el) => el.id === id);
		const oldItem = arr[idx];
		// new data with diff important
		const newItem = { ...oldItem, [propName]: !oldItem[propName] };
		// 
		const before = arr.slice(0, idx);
		const after = arr.slice(idx + 1);
		const newArray = [...before, newItem, ...after];
		return newArray;
	}

	onToggleImportant = (id) => {
		console.log('Toggle important', id);
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, "important")
			};
		})
	}

	onToggleDone = (id) => {
		console.log('Toogle done', id);
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, "done")
			};
		})
	}

	changeFilterStatus = (filter = 'all') => {
		console.log('Change filter status', filter);
		this.setState({ filter });
	};

	changeSearchPanel = (search) => {
		console.log("change", search);
		this.setState({ search });
	}

	returnData = (el, filter, search) => {
		return (
			((el.done === true && filter === 'done') ||
				(el.done === false && filter === 'active') ||
				(filter === 'all')) &&
			(el.label.toLowerCase().includes(search))
		)
	}

	filterData = (todoData, filter, search) => {
		const newArray = todoData
			.filter((el) => this.returnData(el, filter, search));
		return newArray;
	}

	render() {
		const { todoData, filter, search } = this.state;
		// let todoData = this.filerData()
		const data = this.filterData(todoData, filter, search)
		const doneCount = data
			.filter((el) => el.done === true)
			.length;
		console.log(this.state.search);
		const todoCount = data.length - doneCount;
		const isLoggedIn = true;
		const loginBox = <span>Log in please</span>
		const welcomeBox = <span>Welcome back</span>
		return (
			<div>
				{isLoggedIn ? welcomeBox : loginBox}
				<AppHeader todo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel
						onChangeSearchPanel={this.changeSearchPanel}
					/>
					<ItemStatusFilter
						filter={filter}
						onChangeFilterStatus={this.changeFilterStatus}
					/>
				</div>
				<TodoList todos={data}
					onDeleted={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}
				/>
				<AddItem onItemAdded={this.addItem} />
			</div >
		)
	}
}
