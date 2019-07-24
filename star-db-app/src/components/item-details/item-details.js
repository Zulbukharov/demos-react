import React, { Component } from 'react';

import './item-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

export default class ItemDetails extends Component {
	swapiService = new SwapiService();
	state = {
		item: null,
		image: null,
		loading: false,
		error: false,
	};

	componentDidMount() {
		this.updateItem();
	};

	onError = (err) => {
		this.setState({
			error: true,
			loading: false
		})
	};
	updateItem() {
		const { itemId, getData, getImageURL } = this.props;
		if (!itemId) {
			return;
		}

		getData(itemId)
			.then((item) => {
				this.setState({
					item,
					image: getImageURL(item),
					loading: false,
				});
			})
			.catch((err) => {
				console.error(err);
				this.onError(err);
			})
	};

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) {
			this.setState({
				loading: true,
			})
			this.updateItem();
		}
	};

	render() {
		const { item, loading, error, image } = this.state
		const stateItem = !this.state.item && !loading ? <span>Choose a item</span> : null;
		const hasData = !(loading || error || stateItem);
		const errorMessage = error && !loading ? <ErrorIndicator /> : null;
		const spinner = loading ? <Spinner /> : null;
		const itemView = hasData ? <ItemView item={item} image={image} /> : null;
		return (
			<div className="item-details card">
				{stateItem}
				{spinner}
				{itemView}
				{errorMessage}
			</div>
		)
	}
}

const ItemView = ({ item, image }) => {
	const { name, gender, birthYear, eyeColor } = item;
	return (
		<React.Fragment>
			<img className="item-image"
				src={image}
				alt="item" />
			<div className="card-body">
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<span className="term">Gender</span>
						<span>{gender}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Birth Year</span>
						<span>{birthYear}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Eye Color</span>
						<span>{eyeColor}</span>
					</li>
				</ul>
			</div>
		</React.Fragment>
	)
}