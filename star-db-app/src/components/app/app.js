import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemDetails, { Record } from '../item-details';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';

import {
	PersonList,
	PlanetList,
	StarshipList,
	PersonDetails,
	PlanetDetails,
	StarshipDetails,
} from '../sw-components';

import './app.css';

export default class App extends Component {
	swapiService = new SwapiService();
	render() {
		const personDetails = (
			<ItemDetails
				itemId={10}
				getData={this.swapiService.getPerson}
				getImageURL={this.swapiService.getPersonImage}
			>
				<Record field="gender" label="Gender" />
				<Record field="eyeColor" label="Eye Color" />
			</ItemDetails>

		)
		const starshipDetails = (
			<ItemDetails
				itemId={5}
				getData={this.swapiService.getStarship}
				getImageURL={this.swapiService.getStarshipImage}
			>
				<Record field="model" label="Model" />
				<Record field="length" label="Length" />
				<Record field="costInCredits" label="Cost" />
			</ItemDetails>
		)
		return (
			<ErrorBoundry>
				<SwapiServiceProvider value={this.swapiService}>
					<div>
						<Header />
						<RandomPlanet />
						{/* <PersonPage /> */}
						{/* <Row */}
						{/* left={personDetails} */}
						{/* right={starshipDetails} */}
						{/* /> */}
						<PersonList />
						<StarshipList />
						<PlanetList />
						<PersonDetails itemId={3} />
						<PlanetDetails itemId={3} />
						<StarshipDetails itemId={3} />

					</div>
				</SwapiServiceProvider>
			</ErrorBoundry>
		);
	}
};