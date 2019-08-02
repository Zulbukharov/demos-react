import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import {fetchBooks} from '../../actions';
import Spinner from '../spinner';


import { withBookstoreService } from '../hoc';
import './book-list.css';
import ErrorIndicator from '../error-indicator';

class BookList extends Component {
	componentDidMount() {
		this.props.fetchBooks();
	};

	render() {
		const { books, loading, error } = this.props;
		if (loading) {
			return <Spinner/>
		}
		if (error) {
			return <ErrorIndicator/>
		}
		return (
			<ul className="book-list">
				{
					books.map((book) => {
						return (
							<li key={book.id}><BookListItem book={book} /></li>
						)
					})
				}
			</ul>
		)
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
		fetchBooks: fetchBooks(ownProps.bookstoreService, dispatch)
	}
	// return bindActionCreators(actions, dispatch)
};


export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));