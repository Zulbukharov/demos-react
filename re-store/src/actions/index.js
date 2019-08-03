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

const itemsLoaded = (newItems) => {
	return {
		type: 'FETCH_ITEMS_SUCCESS',
		payload: newItems,
	};
};



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
	itemsLoaded,
};