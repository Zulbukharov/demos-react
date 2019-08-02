import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';


import { withBookstoreService } from '../hoc';
import './book-list.css';

class BookList extends Component {
	componentDidMount() {
		// recieve data
		const { bookstoreService } = this.props;
		const data = bookstoreService.getBooks();
		console.log(data);
		// dispatch data
		this.props.booksLoaded(data);
	};

	render() {
		const { books } = this.props;

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

const mapStateToProps = ({ books }) => {
	return {
		books: books,
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actions, dispatch)
};

export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));