const initialState = {
	books: [],
	loading: true,
	error: null,
	cartItems: [{
		id: 1,
		name: 'Чистый код',
		count: 3,
		total: 12,
	},
	{
		id: 2,
		name: 'книга 2',
		count: 3,
		total: 20,
	}],
	orderTotal: 40,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_BOOKS_REQUEST':
			return {
				books: [],
				loading: true,
				error: null,
				cartItems: state.cartItems,
				orderTotal: state.orderTotal,
			}
		case 'FETCH_BOOKS_SUCCESS':
			return {
				books: action.payload,
				loading: false,
				error: null,
				cartItems: state.cartItems,
				orderTotal: state.orderTotal,
			};
		case 'FETCH_BOOKS_FAILURE':
			return {
				books: [],
				loading: false,
				error: action.payload
			};
		case 'FETCH_ITEMS_SUCCESS':
			return {
				books: [],
				loading: false,
				error: null,
				items: action.payload,
				total: 40,
			};
		default:
			return state;
	}
};

export default reducer;