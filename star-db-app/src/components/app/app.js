import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dammy-serivce'
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';
import { PeoplePage, PlanetPage, StarshipPage } from '../pages';
import { StarshipDetails } from '../sw-components';

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
					<Router>
						<div>
							<Header onServiceChange={this.onServiceChange} />
							<RandomPlanet updateInterval={10000} />
							<Route path="/" render={() => {
								return <h2>Welcome to StarDB</h2>
							}} exact={true} />
							<Route path="/people" render={() => {
								return <h2>People</h2>;
							}} />
							<Route path="/people" component={PeoplePage} />
							<Route path="/planets" component={PlanetPage} />
							<Route path="/starships" exact component={StarshipPage} />
							<Route path="/starships/:id" render={({ match }) => {
								const id = match.params.id;
								// match => :id
								// location => current state
								console.log(match);
								return <StarshipDetails itemId={id} />
							}} />

						</div>
					</Router>
				</SwapiServiceProvider>
			</ErrorBoundry>
		);
	}
};