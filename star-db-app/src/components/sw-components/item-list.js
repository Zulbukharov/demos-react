import React from 'react';
import withSwapiService, { withData } from '../hoc-helpers';
import ItemList from '../item-list';

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
			ItemList, renderName)),
	mapPersonMethodsToProps);
const PlanetList = withSwapiService(
	withData(
		withChildFunction(
			ListWithChildren, renderName)),
	mapPlanetsMethodToProps);
const StarshipList = withSwapiService(
	withData(withChildFunction(ItemList, renderModelName)), mapStarshipsMethodToProps);

export {
	PersonList,
	PlanetList,
	StarshipList,
};