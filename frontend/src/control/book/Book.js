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
        console.log('book cdm');
        this.props.bookGet();
    }

    shouldComponentUpdate(nextProps, nextState){
		if(this.props.book.length === 0 && nextProps.book.length === 0) return false;
		console.log('book scu');
		console.log('thispropsbook',this.props.book);
		console.log('nextbook', nextProps.book);
		console.log(this.props.book !== nextProps.book);
		return this.props.book !== nextProps.book;
    }

    handleBookCreate = (book) => {
        return this.props.bookCreate(book).then(
            () => {
                if(this.props.createStatus !== 'SUCCESS') return false;
                this.props.bookGet();
                return true;
            }
        );
    }

	render() {
        console.log('book render');
		return (
            <div>
                <BookCom bookCreate={this.handleBookCreate} book={this.props.book}/>
            </div>
            
        );
	}
}

const mapStateToProps = (state) => {
    const book = state.book.toJS();
    console.log('book statetoprops', book);
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
        bookGet: () => {
            return dispatch(bookGet());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
