import React, { Component } from 'react';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import './person-page.css';
import SwapiService from "../../services/swapi-service";
import Row from '../row';
import ErrorBoundry from '../error-boundry';

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

	render() {
		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.swapiService.getAllPeople}
			>
				{({ name, gender, birthYear }) => `${name} (${gender} ${birthYear})`}
			</ItemList>)

		const itemDetails = (<ItemDetails itemId={this.state.selectedPerson} />)

		return (
			<ErrorBoundry>
				<Row left={itemList} right={itemDetails} />
			</ErrorBoundry>
		)
	}
}