import React from 'react';
import ItemDetails, { Record } from '../item-details';
import withSwapiService from '../hoc-helpers';

const PersonDetails = (props) => {

	console.log(props);
	return (
		<ItemDetails
			{...props}
		>
			<Record field="gender" label="Gender" />
			<Record field="eyeColor" label="Eye Color" />
		</ItemDetails>
	);
};

const mapMethodToProps = (swapiService) => {
	return {
		getData: swapiService.getPerson,
		getImageURL: swapiService.getPersonImage,
	};
};

export default withSwapiService(PersonDetails, mapMethodToProps);