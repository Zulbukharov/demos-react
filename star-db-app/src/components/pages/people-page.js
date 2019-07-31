import React from 'react';
import { PersonList, PersonDetails } from '../sw-components';
import Row from '../row';
import { withRouter } from 'react-router-dom';

const PeoplePage = ({ history, match }) => {
	return (
		<Row
			left={<PersonList onItemSelected={(itemId) => {
				return history.push(`/people/${itemId}`);
			}} />}
			right={<PersonDetails itemId={match.params.id} />}
		/>
	)
};

export default withRouter(PeoplePage);