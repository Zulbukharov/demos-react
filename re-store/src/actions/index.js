const booksLoaded = (newBooks) => {
	return {
		type: 'FETCH_BOOKS_SUCCESS',
		payload: newBooks,
	};
};

const booksRequested = () => {
	return {
		type: 'FETCH_BOOKS_REQUEST',
	}
}

const booksError = (error) => {
	return {
		type: 'FETCH_BOOKS_FAILURE',
		payload: error,
	}
}

const bookAddedToCart = (id) => {
	return {
		type: 'BOOK_ADDED_TO_CART',
		payload: id
	};
};

const onBookDeletedFromCart = (id) => {
	return {
		type: 'BOOK_DELETED_FROM_CART',
		payload: id,
	}
}

const onBookIncreased = (id) => {
	return {
		type: 'INCREASE_BOOK_COUNT',
		payload: id,
	}
}

const onBookDecresed = (id) => {
	return {
		type: 'DECREASE_BOOK_COUNT',
		payload: id
	}
}


const fetchBooks = (bookstoreService, dispatch) => () => {
	dispatch(booksRequested());
	bookstoreService.getBooks()
		.then((data) => dispatch(booksLoaded(data)))
		.catch((err) => dispatch(booksError(err)));
	console.log('fetchingh');
}

export {
	booksLoaded,
	booksRequested,
	booksError,
	fetchBooks,
	bookAddedToCart,
	onBookDeletedFromCart,
	onBookIncreased,
	onBookDecresed,
};