import React, { Component } from 'react';

import './item-details.css';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button';

const Record = ({ item, label, field }) => {
	return (
		<li className="list-group-item">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
	);
};

export {
	Record
};

export default class ItemDetails extends Component {
	swapiService = new SwapiService();
	state = {
		item: null,
		image: null,
	};

	componentDidMount() {
		this.updateItem();
	};

	// onError = (err) => {
	// 	this.setState({
	// 		error: true,
	// 		loading: false
	// 	})
	// };
	updateItem() {
		const { itemId, getData, getImageURL } = this.props;
		if (!itemId) {
			return;
		}
		console.log(getData);
		getData(itemId)
			.then((item) => {
				this.setState({
					item,
					image: getImageURL(item),
					// loading: false,
				});
			})
		// .catch((err) => {
		// 	console.error(err);
		// 	this.onError(err);
		// })
	};

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId ||
			this.props.getData !== prevProps.getData) {
			// this.setState({
			// loading: true,
			// })
			this.updateItem();
		}
	};

	render() {
		// const { item, loading, error, image } = this.state
		const { item, image } = this.state;
		if (!item) {
			return (
				<span>Select an item from list</span>
			)
		}
		const { name } = item;
		// const stateItem = !this.state.item && !loading ? <span>Choose a item</span> : null;
		// const hasData = !(loading || error || stateItem);
		// const errorMessage = error && !loading ? <ErrorIndicator /> : null;
		// const spinner = loading ? <Spinner /> : null;
		// const itemView = hasData ? <ItemView child={this.props.children} item={item} image={image} /> : null;
		return (
			<div className="item-details card">
				{/* {stateItem}
				{spinner}
				{itemView}
				{errorMessage} */}
				<img className="item-image"
					src={image}
					alt="item" />
				<div className="card-body">
					<h4>{name}</h4>
					<ErrorButton />
					<ul className="list-group list-group-flush">
						{
							React.Children.map(this.props.children, (children) => {
								return React.cloneElement(children, { item })
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}

// const ItemView = ({ child, item, image }) => {
// 	const { name } = item;
// 	return (
// 		<React.Fragment>
// 			<img className="item-image"
// 				src={image}
// 				alt="item" />
// 			<div className="card-body">
// 				<h4>{name}</h4>
// 				<ErrorButton />
// 				<ul className="list-group list-group-flush">
// 					{
// 						React.Children.map(child, (ch) => {
// 							return React.cloneElement(ch, { item })
// 						})
// 					}
// 				</ul>
// 			</div>
// 		</React.Fragment>
// 	)
// }


// export default withData(ItemDetails)
// f(1)(2);