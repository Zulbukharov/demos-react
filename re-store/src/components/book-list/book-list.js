import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import { fetchBooks, bookAddedToCart } from '../../actions';
import Spinner from '../spinner';


import { withBookstoreService } from '../hoc';
import './book-list.css';
import ErrorIndicator from '../error-indicator';

const BookList = ({ books, onAddedToCart }) => {
	return (
		<ul className="book-list">
			{
				books.map((book) => {
					return (
						<li key={book.id}><BookListItem book={book} onAddedToCart={() => onAddedToCart(book.id)} /></li>
					)
				})
			}
		</ul>
	)
};


// оборачивает компонент для отображения, выполняет связть с компонентом
class BookListContainer extends Component {
	componentDidMount() {
		this.props.fetchBooks();
	};

	render() {
		const { books, loading, error, onAddedToCart } = this.props;
		if (loading) {
			return <Spinner />
		}
		if (error) {
			return <ErrorIndicator />
		}
		return <BookList books={books} onAddedToCart={onAddedToCart} />
	}
};

const mapStateToProps = ({ books, loading, error }) => {
	return {
		books: books,
		loading: loading,
		error: error,
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchBooks: fetchBooks(ownProps.bookstoreService, dispatch),
		onAddedToCart: (id) => dispatch(bookAddedToCart(id)),
	}
	// return bindActionCreators(actions, dispatch)
};


export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookListContainer));