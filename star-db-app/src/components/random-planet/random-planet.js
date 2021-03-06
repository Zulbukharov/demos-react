import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'
import './random-planet.css';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {

	swapiService = new SwapiService();

	constructor() {
		super();
		this.state = {
			planet: {},
			loading: true,
			error: false,
		};
		// clearInterval(this.interval);

	};

	componentDidMount() {
		const { updateInterval } = this.props
		this.updatePlanet();
		this.interval = setInterval(this.updatePlanet, updateInterval);
	}

	onPlanetLoaded = (planet) => {
		this.setState({
			planet,
			loading: false
		});
	}

	onError = (err) => {
		this.setState({
			error: true,
			loading: false
		})
	};

	updatePlanet = () => {
		const id = Math.floor(Math.random() * 25) + 2;
		// const id = 1500;
		this.swapiService.getPlanet(id)
			.then(this.onPlanetLoaded)
			.catch(this.onError);
	};
	// .catch((err) => {
	// 	console.error(err);
	// });
	componentWillUnmount = () => {
		clearInterval(this.interval);
	}

	render() {
		const { planet, loading = true, error } = this.state;
		const hasData = !(loading || error);
		const errorMessage = error ? <ErrorIndicator /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = hasData ? <PlanetView planet={planet} /> : null;
		return (
			<div className="random-planet jumbotron rounded">
				{spinner}
				{content}
				{errorMessage}
			</div>

		);
	}
}

// деволтные параметры
RandomPlanet.defaultProps = {
	updateInterval: 10000
}

// возвращение ошибки
RandomPlanet.propTypes = {
	updateInterval: (props, propName, componentName) => {
		const value = props[propName];
		if (typeof (value) == 'number' && !isNaN(value)) {
			return null;
		}
		return new TypeError(`${componentName}: ${propName}`);
	}
}

const PlanetView = ({ planet }) => {
	const { id, name, population, rotationPeriod, diameter } = planet;

	return (
		<React.Fragment>
			<img className="planet-image"
				src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
				alt="planet" />
			<div>
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<span className="term">Population</span>
						<span>{population}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Rotation Period</span>
						<span>{rotationPeriod}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Diameter</span>
						<span>{diameter}</span>
					</li>
				</ul>
			</div>
		</React.Fragment>
	)
}