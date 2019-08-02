const initialState = {
	books: [
		{
			id: 1,
			title: 'Чистый код',
			author: 'хз'
		},
		{
			id: 2,
			title: 'книга 2',
			author: 'хз'
		}
	],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'BOOKS_LOADED':
			return {
				books: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;