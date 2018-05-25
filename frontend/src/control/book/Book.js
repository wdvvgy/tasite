import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BookCom } from 'component';
import { connect } from 'react-redux';
import { bookCreate, bookGet } from '../../modules/book';
import { logError } from 'util';

class Book extends Component {

	static propTypes = {
		createStatus: PropTypes.string,
		getStatus: PropTypes.string,
		book: PropTypes.array,
		bookCreate: PropTypes.func.isRequired,
		bookGet: PropTypes.func.isRequired,
	}

	static defaultProps = {
		createStatus: '',
		getStatus: '',
		book: [],
		bookCreate: () => logError('Book bookCreateRequest'),
		bookGet: () => logError('Book getRequest'),
	}

	componentDidMount(){
		const token = JSON.parse(localStorage.getItem('devblog')).token;
		this.props.bookGet(token);
	}

	shouldComponentUpdate(nextProps, nextState){
		if(this.props.book.length === 0 && nextProps.book.length === 0) return false;
		return this.props.book !== nextProps.book;
	}

	handleBookCreate = (book) => {
		const token = JSON.parse(localStorage.getItem('devblog')).token;
		return this.props.bookCreate({ book, token }).then(
			() => {
				if(this.props.createStatus !== 'SUCCESS') return false;
				this.props.bookGet(token);
				return true;
			}
		);
	}

	render() {
		return (
			<div>
				<BookCom bookCreate={this.handleBookCreate} book={this.props.book}/>
			</div>
			
		);
	}
}

const mapStateToProps = (state) => {
	const book = state.book.toJS();
	return {
		createStatus: book.createStatus,
		getStatus: book.getStatus,
		book: book.book
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		bookCreate: (book) => {
			return dispatch(bookCreate(book));
		},
		bookGet: (token) => {
			return dispatch(bookGet(token));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
