import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import Spinner from '../spinner';


import { withBookstoreService } from '../hoc';
import './book-list.css';

class BookList extends Component {
	componentDidMount() {
		const { bookstoreService } = this.props;
		bookstoreService.getBooks()
		.then((data) => this.props.booksLoaded(data));
	};

	render() {
		const { books, loading } = this.props;
		if (loading) {
			return <Spinner/>
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

const mapStateToProps = ({ books, loading }) => {
	return {
		books: books,
		loading: loading
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actions, dispatch)
};

export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));