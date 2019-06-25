import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

export default class PersonDetails extends Component {
	swapiService = new SwapiService();
	state = {
		person: null,
		loading: false,
		error: false,
	};

	componentDidMount() {
		this.updatePerson();
	};

	onError = (err) => {
		this.setState({
			error: true,
			loading: false
		})
	};
	updatePerson() {
		const { personId } = this.props;
		if (!personId) {
			return;
		}
		this.swapiService
			.getPerson(personId)
			.then((person) => {
				this.setState({
					person,
					loading: false,
				});
			})
			.catch((err) => {
				console.error(err);
				this.onError(err);
			})
	};

	componentDidUpdate(prevProps) {
		if (this.props.personId != prevProps.personId) {
			this.setState({
				loading: true,
			})
			this.updatePerson();
		}
	};

	render() {
		const { person, loading, error } = this.state
		const statePerson = !this.state.person && !loading ? <span>Choose a Person</span> : null;
		const hasData = !(loading || error || statePerson);
		const errorMessage = error && !loading ? <ErrorIndicator /> : null;
		const spinner = loading ? <Spinner /> : null;
		const personView = hasData ? <PersonView person={person} /> : null;
		return (
			<div className="person-details card">
				{statePerson}
				{spinner}
				{personView}
				{errorMessage}
			</div>
		)
	}
}

const PersonView = ({ person }) => {
	const { id, name, gender, birthYear, eyeColor } = person;
	return (
		<React.Fragment>
			<img className="person-image"
				src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
				alt="person" />
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