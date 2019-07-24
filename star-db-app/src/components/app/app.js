import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import Row from '../row';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';


export default class App extends Component {
	swapiService = new SwapiService();
	render() {
		const personDetails = (
			<ItemDetails
				itemId={2}
				getData={this.swapiService.getPerson}
				getImageURL={this.swapiService.getPersonImage}
			/>
		)
		const starshipDetails = (
			<ItemDetails
				itemId={5}
				getData={this.swapiService.getStarship}
				getImageURL={this.swapiService.getStarshipImage}

			/>
		)
		return (
			<div>
				<Header />
				<RandomPlanet />
				{/* <PersonPage /> */}
				<Row
					left={personDetails}
					right={starshipDetails}
				/>
			</div>
		);
	}
};