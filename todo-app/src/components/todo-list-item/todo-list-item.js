import React, { Component } from 'react';
import "./todo-list-item.css"
// props принимает каждый react компонент.
// react компонент возвращает реакт элемент
// props {
//  label: "string",
//  important: "boolean"
// }


export default class TodoListItem extends Component {

	render() {
		const { label = "Empty", onToggleImportant,
			onToggleDone, important, done } = this.props;

		let classNames = "todo-list-item"
		classNames = done ? classNames + " done" : classNames;
		classNames = important ? classNames + " important" : classNames;
		return (
			<span className={classNames}>
				<span
					className="todo-list-item-label"
					onClick={onToggleDone}>
					{label}
				</span>

				<button type="button"
					className="btn btn-outline-success btn-sm float-right"
					onClick={onToggleImportant}>
					<i className="fa fa-exclamation" />
				</button>

				<button type="button"
					className="btn btn-outline-danger btn-sm float-right"
					onClick={this.props.onDeleted}
				>
					<i className="fa fa-trash-o" />
				</button>
			</span>
		);
	}
}
