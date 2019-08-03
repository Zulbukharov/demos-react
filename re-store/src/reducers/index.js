const initialState = {
	books: [],
	loading: true,
	error: null,
	cartItems: [],
	orderTotal: 40,
};

const decreaseBookFromCart = (cartItems, book, bookId) => {
	return (cartItems.map((b) => {
		if (b.id === bookId) {
			return {
				...b,
				count: b.count - 1,
				total: b.total - book.price,
			}
		}
		else {
			return b
		}
	}));
}

const updateCartItems = (cartItems, book, bookId) => {
	return (cartItems.map((b) => {
		if (b.id === bookId) {
			return {
				...b,
				count: b.count + 1,
				total: b.total + book.price,
			}
		}
		else {
			return b
		}
	}));
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_BOOKS_REQUEST': {
			return {
				...state,
				books: [],
				loading: true,
				error: null,
			}
		}
		case 'FETCH_BOOKS_SUCCESS': {
			return {
				...state,
				books: action.payload,
				loading: false,
				error: null,
			};
		}
		case 'FETCH_BOOKS_FAILURE': {
			return {
				...state,
				books: [],
				loading: false,
				error: action.payload
			};
		}
		case 'BOOK_ADDED_TO_CART': {
			const bookId = action.payload;
			const book = state.books.find((book) => book.id === bookId);
			const existId = state.cartItems.find((book) => book.id === bookId);
			if (existId) {
				const books = updateCartItems(state.cartItems, book, bookId);
				return {
					...state,
					cartItems: books
				}
			}
			const newItem = {
				id: book.id,
				title: book.title,
				count: 1,
				total: book.price,
			};
			return {
				...state,
				cartItems: [...state.cartItems, newItem],
			}
		}
		case 'BOOK_DELETED_FROM_CART': {
			const bId = action.payload;
			const newBooks = state.cartItems.filter(item => item.id !== bId);
			return {
				...state,
				cartItems: newBooks,
			}
		}
		case 'INCREASE_BOOK_COUNT': {
			const bookId = action.payload;
			const book = state.books.find((book) => book.id === bookId);
			const books = updateCartItems(state.cartItems, book, bookId);
			return {
				...state,
				cartItems: books
			}
		}
		case 'DECREASE_BOOK_COUNT': {
			const bookId = action.payload;
			const book = state.books.find((book) => book.id === bookId);
			const books = decreaseBookFromCart(state.cartItems, book, bookId);
			const filteredBooks = books.filter((book) => book.count > 0);
			return {
				...state,
				cartItems: filteredBooks
			}
		}
		default:
			return state;
	}
};

export default reducer;