import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { withBookstoreService } from '../hoc';
import { HomePage, CartPage } from '../pages';
import './app.css';
import ShopHeader from '../shop-header';

const App = ({ bookstoreService }) => {
	console.log(bookstoreService.getBooks());
	return (
		<main role="main" className="container">
			<ShopHeader numItems={12} total={210} />
			<Switch>
				<Route path="/" exact component={HomePage} />
				<Route path="/cart" component={CartPage} />
				<Route render={() => {
					return (
						<h2>404</h2>
					)
				}} />
			</Switch>
		</main>
	);
}

export default withBookstoreService()(App);