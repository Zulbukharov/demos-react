import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dammy-serivce'
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PeoplePage, PlanetPage, StarshipPage, LoginPage, SecretPage } from '../pages';
import { StarshipDetails } from '../sw-components';
import './app.css';

export default class App extends Component {
	state = {
		swapiService: new SwapiService(),
		isLoggedIn: false,
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

	onLogin = () => {
		console.log('new state');
		this.setState({
			isLoggedIn: true,
		})
	};

	render() {
		const { isLoggedIn } = this.state;

		return (
			<ErrorBoundry>
				<SwapiServiceProvider value={this.state.swapiService}>
					<Router>
						<div>
							<Header onServiceChange={this.onServiceChange} />
							<RandomPlanet updateInterval={10000} />
							<Switch>
								<Route path="/" render={() => {
									return <h2>Welcome to StarDB</h2>
								}} exact={true} />
								<Route path="/people/:id?" render={({ match }) => {
									const id = match.params.id;
									return <PeoplePage itemId={id} />;
								}} />
								<Route path="/planets" component={PlanetPage} />
								<Route path="/starships" exact component={StarshipPage} />
								<Route path="/starships/:id" render={({ match }) => {
									const id = match.params.id;
									// match => :id
									// location => current state
									console.log(match);
									return <StarshipDetails itemId={id} />
								}} />
								<Route path="/login" render={() => {
									return <LoginPage isLoggedIn={isLoggedIn}
										onLogin={this.onLogin} />
								}} />
								<Route path="/secret" render={() => {
									return <SecretPage isLoggedIn={isLoggedIn} />
								}} />
								<Route render={() => {
									return <h2>Page Not Found</h2>;
								}} />
							</Switch>

						</div>
					</Router>
				</SwapiServiceProvider>
			</ErrorBoundry>
		);
	}
};