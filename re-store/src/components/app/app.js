import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { withBookstoreService } from '../hoc';
import { HomePage, CartPage } from '../pages';
import './app.css';

const App = ({ bookstoreService }) => {
	console.log(bookstoreService.getBooks());
	return (
		<Switch>
			<Route path="/" exact component={HomePage} />
			<Route path="/cart" component={CartPage} />
			<Route render={() => {
				return (
					<h2>404</h2>
				)
			}} />
		</Switch>
	);
}

export default withBookstoreService()(App);