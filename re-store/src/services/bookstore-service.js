export default class BookstoreService {
	data = [
		{
			id: 1,
			title: 'Чистый код',
			author: 'хз',
			price: 12,
			coverImage: 'https://picsum.photos/200'
		},
		{
			id: 2,
			title: 'книга 2',
			author: 'хз',
			price: 20,
			coverImage: 'https://picsum.photos/200'
		}
	];

	getBooks() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(this.data)
				// reject(new Error('Somethig bad happened'))
			}, 700)
		})
	}
};