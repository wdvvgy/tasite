import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import axios from 'axios';
import { addTokenHeader } from '../util';

export const BOOK_GET = "book/get";
export const BOOK_GET_SUCCESS = "book/get/success";
export const BOOK_GET_FAILURE = "book/get/failure";

export const BOOK_CREATE = "book/create";
export const BOOK_CREATE_SUCCESS = "book/create/success";
export const BOOK_CREATE_FAILURE = "book/create/failure";

const url = '/api/book';

export const bookGet = (token) => dispatch => {
	dispatch({type: BOOK_GET});
	return axios.get(url, addTokenHeader(token)
	).then((res) => {
		dispatch({type: BOOK_GET_SUCCESS, payload: res.data.book});
	}).catch((error) => {
		dispatch({type: BOOK_GET_FAILURE, payload: error});
	});
};

export const bookCreate = ({ book, token }) => dispatch => {
	dispatch({type: BOOK_CREATE});
	return axios.post(url, { book }, addTokenHeader(token)
	).then((res) => {
		dispatch({type: BOOK_CREATE_SUCCESS, payload: res});
	}).catch((error) => {
		dispatch({type: BOOK_CREATE_FAILURE, payload: error});
	});
};

const initialState = Map({
	createStatus: 'INIT',
	getStatus: 'INIT',
	book: List([

	]),
});

export default handleActions({
	[BOOK_GET]: (state, action) => {
		return state.set('getStatus', 'WAITING');
	},
	[BOOK_GET_SUCCESS]: (state, action) => {
		return state
			.set('getStatus', 'SUCCESS')
			.set('book', action.payload);
	},
	[BOOK_GET_FAILURE]: (state, action) => {
		return state.set('getStatus', 'FAILURE');
	},
	[BOOK_CREATE]: (state, action) => {
		return state.set('createStatus', 'WAITING');
	},
	[BOOK_CREATE_SUCCESS]: (state, action) => {
		return state.set('createStatus', 'SUCCESS');
	},
	[BOOK_CREATE_FAILURE]: (state, action) => {
		return state.set('createStatus', 'FAILURE');
	},
}, initialState);

