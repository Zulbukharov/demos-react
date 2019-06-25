import React, { Component } from 'react';

import './item-list.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

export default class ItemList extends Component {
	state = {
		peopleList: null,
	};
	swapiService = new SwapiService();

	componentDidMount() {
		this.swapiService
			.getAllPeople()
			.then((peopleList) => {
				console.log(peopleList);
				this.setState({
					peopleList
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	renderItems(arr) {
		return arr.map(({ id, name }) => {
			return (
				<li className="list-group-item"
					key={id}
					onClick={() => this.props.onItemSelected(id)}>
					{name}
				</li>
			);
		});
	};

	render() {
		const { peopleList } = this.state;
		if (!peopleList) {
			return <Spinner />
		}
		const items = this.renderItems(peopleList);
		return (
			<ul className="item-list list-group">
				{items}
			</ul>
		);
	}
}
