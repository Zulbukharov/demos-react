import React, { Component } from 'react';
import './search-panel.css'

export default class SearchPanel extends Component {
	constructor() {
		super();
		this.state = {
			label: ''
		};
	};

	onLabelChange = (el) => {
		console.log(el.target.value);
		this.props.onChangeSearchPanel(el.target.value)
		this.setState({
			label: el.target.value
		})
	};

	render() {
		return (
			<input
				type="text"
				className="form-control search-input"
				placeholder="Input group example"
				onChange={this.onLabelChange}
				value={this.state.label}
			/>
		);
	};
}
