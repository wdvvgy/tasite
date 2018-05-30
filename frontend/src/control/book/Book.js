import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BookCom } from 'component';
import { connect } from 'react-redux';
import { bookCreate, bookGet, bookEdit, bookDelete } from '../../modules/book';
import { authGet } from '../../modules/auth';
import { logError } from 'util';

class Book extends Component {

	static propTypes = {
		createStatus: PropTypes.string,
		getStatus: PropTypes.string,
		editStatus: PropTypes.string,
		delStatus: PropTypes.string,
		book: PropTypes.array,
		bookCreate: PropTypes.func.isRequired,
		bookGet: PropTypes.func.isRequired,
		users: PropTypes.array,
	}

	static defaultProps = {
		createStatus: '',
		getStatus: '',
		editStatus: '',
		delStatus: '',
		book: [],
		bookCreate: () => logError('Book bookCreateRequest'),
		bookGet: () => logError('Book getRequest'),
		users: [],
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

	handleSearchUsers = (token) => {
		return this.props.searchUsers(token).then(() => {
			return this.props.users;
		});
	}

	handleEdit = ({bookId, book}) => {
		const token = JSON.parse(localStorage.getItem('devblog')).token;
		return this.props.bookEdit({ bookId, book, token }).then(
			() => {
				if(this.props.editStatus !== 'SUCCESS') return false;
				this.props.bookGet(token);
				return true;
			}
		);
	}

	handleDelete = (bookId) => {
		const token = JSON.parse(localStorage.getItem('devblog')).token;
		return this.props.bookDelete({ bookId, token }).then(
			() => {
				if(this.props.delStatus !== 'SUCCESS') return false;
				this.props.bookGet(token);
				return true;
			}
		);
	}

	render() {
		return (
			<BookCom 
				bookCreate={this.handleBookCreate} 
				book={this.props.book} 
				searchUsers={this.handleSearchUsers} 
				handleEdit={this.handleEdit}
				handleDelete={this.handleDelete}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	const book = state.book.toJS();
	const auth = state.auth.toJS().users;
	return {
		createStatus: book.createStatus,
		getStatus: book.getStatus,
		editStatus: book.editStatus,
		delStatus: book.delStatus,
		book: book.book,
		users: auth.data
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		bookCreate: (book) => {
			return dispatch(bookCreate(book));
		},
		bookGet: (token) => {
			return dispatch(bookGet(token));
		},
		searchUsers: (token) => {
			return dispatch(authGet(token));
		},
		bookEdit: ({bookId, book, token}) => {
			return dispatch(bookEdit({bookId, book, token}));
		},
		bookDelete: ({bookId, token}) => {
			return dispatch(bookDelete({bookId, token}));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
