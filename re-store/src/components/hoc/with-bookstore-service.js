import React from 'react';
import { BookstoreServiceConsumer } from '../bookstore-service-context';

const withBookstoreService = () => (Wrapped) => {
	return (props) => {
		console.log(props);
		return (
			<BookstoreServiceConsumer>
				{
					(bookstoreService) => {
						return <Wrapped {...props} bookstoreService={bookstoreService} />
					}
				}
			</BookstoreServiceConsumer>
		)
	}
}

export default withBookstoreService;