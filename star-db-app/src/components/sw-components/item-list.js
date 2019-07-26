import React from 'react';
import withSwapiService, { withData } from '../hoc-helpers';
import ItemList from '../item-list';
import SwapiService from '../../services/swapi-service';
// import withSwapiService from '../hoc-helpers';

const swapiService = new SwapiService();

const {
	getAllPeople,
	getAllPlanets,
	getAllStarships,
} = swapiService;

const withChildFunction = (Wrapped, fn) => {
	return (props) => {
		return (
			<Wrapped {...props}>
				{fn}
			</Wrapped>
		);
	};
};

const ListWithChildren = withChildFunction(
	ItemList,
	({ name }) => {
		return (<span>{name}</span>);
	}
);

const renderName = ({ name }) => {
	return (
		<span>{name}</span>
	);
};

const renderModelName = ({ model, name }) => {
	return (
		<span>{name} ({model})</span>
	)
}

const mapPersonMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPeople,
	}
};

const mapPlanetsMethodToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPlanets,
	}
}

const mapStarshipsMethodToProps = (swapiService) => {
	return {
		getData: swapiService.getAllStarships,
	}
}

const PersonList = withSwapiService(
	withData(
		withChildFunction(
			ItemList, renderName),
		getAllPeople),
	mapPersonMethodsToProps);
const PlanetList = withSwapiService(
	withData(ListWithChildren, getAllPlanets),
	mapPlanetsMethodToProps);
const StarshipList = withSwapiService(
	withData(withChildFunction(ItemList, renderModelName), getAllStarships),
	mapStarshipsMethodToProps);

export {
	PersonList,
	PlanetList,
	StarshipList,
};