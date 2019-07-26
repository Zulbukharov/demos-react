import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dammy-serivce'
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';
import { PeoplePage, PlanetPage, StarshipPage } from '../pages';

export default class App extends Component {
	state = {
		swapiService: new SwapiService()
	}
	onServiceChange = () => {
		this.setState(({ swapiService }) => {
			const Service = swapiService instanceof SwapiService ?
				DummySwapiService : SwapiService;
			return {
				swapiService: new Service(),
			}
		})
	};

	render() {
		return (
			<ErrorBoundry>
				<SwapiServiceProvider value={this.state.swapiService}>
					<div>
						<Header onServiceChange={this.onServiceChange} />
						<RandomPlanet />
						<PeoplePage />
						<PlanetPage />
						<StarshipPage />
					</div>
				</SwapiServiceProvider>
			</ErrorBoundry>
		);
	}
};