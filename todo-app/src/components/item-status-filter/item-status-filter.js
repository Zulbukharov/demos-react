import React, { Component } from 'react'
import './item-status-filter.css'

export default class ItemStatusFilter extends Component {
	constructor() {
		super();
		this.state = {
			buttons: [
				{ name: "All", label: 'all' },
				{ name: "Active", label: 'active' },
				{ name: "Done", label: 'done' }
			]
		}
	}
	render() {
		const { onChangeFilterStatus, filter } = this.props;
		const buttons = this.state.buttons.map(({ name, label }) => {
			console.log(filter)
			const style = filter === label ? "btn btn-primary" : "btn btn-outline-secondary";
			return (
				<button key={name} type="button" className={style} onClick={() => { onChangeFilterStatus(label) }}>{name}</button>
			)
		});
		return (
			buttons
		)
	}
}