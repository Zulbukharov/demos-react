import React, { Component } from 'react';
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details';
import './person-page.css';
import SwapiService from "../../services/swapi-service";
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';

export default class PersonPage extends Component {
	state = {
		selectedPerson: null,
		hasError: false,
	}
	swapiService = new SwapiService();

	onItemSelected = (id) => {
		console.log(id);
		this.setState({
			selectedPerson: id
		});
	}

	componentDidCatch() {
		this.setState({
			hasError: true,
		});
	}

	render() {
		if (this.state.hasError) {
			return <ErrorIndicator />
		}
		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.swapiService.getAllPeople}
			>
				{({ name, gender, birthYear }) => `${name} (${gender} ${birthYear})`}
			</ItemList>)

		const itemDetails = (

			<ItemDetails itemId={this.state.selectedPerson}
				getData={this.swapiService.getPerson}
				getImageURL={this.swapiService.getPersonImage}
			>
				<Record field="gender" label="Gender" />
				<Record field="eyeColor" label="Eye Color" />
			</ItemDetails>
		)

		return (
			<ErrorBoundry>
				<Row left={itemList} right={itemDetails} />
			</ErrorBoundry>
		)
	}
}