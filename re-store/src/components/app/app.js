import React from 'react';
import { withBookstoreService } from '../hoc';

import './app.css';

const App = ({ bookstoreService }) => {
	console.log(bookstoreService.getBooks());
	return (
		<h2>App</h2>
	);
}

export default withBookstoreService()(App);