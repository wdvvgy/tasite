import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import axios from 'axios';

export const BOOK_GET = "book/get";
export const BOOK_GET_SUCCESS = "book/get/success";
export const BOOK_GET_FAILURE = "book/get/failure";

export const BOOK_CREATE = "book/create";
export const BOOK_CREATE_SUCCESS = "book/create/success";
export const BOOK_CREATE_FAILURE = "book/create/failure";

const url = '/api/book';

export const bookGet = () => dispatch => {
    dispatch({type: BOOK_GET});
    return axios.get(url)
        .then((res) => {
            dispatch({type: BOOK_GET_SUCCESS, payload: res});
        }).catch((error) => {
            dispatch({type: BOOK_GET_FAILURE, payload: error});
        })
};

export const bookCreate = (book) => dispatch => {
    dispatch({type: BOOK_CREATE});
    return axios.post(url, {
        book
    }).then((res) => {
        dispatch({type: BOOK_CREATE_SUCCESS, payload: res});
    }).catch((error) => {
        dispatch({type: BOOK_CREATE_FAILURE, payload: error});
    });
}

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
            .set('book', action.payload.data);
    },
    [BOOK_GET_FAILURE]: (state, action) => {
        return state.set('getStatus', 'FAILURE');
    },
    [BOOK_CREATE]: (state, action) => {
        return state.set('createStatus', 'WAITING');
    },
    [BOOK_CREATE_SUCCESS]: (state, action) => {
        return state.set('createStatus', 'SUCCESS')
    },
    [BOOK_CREATE_FAILURE]: (state, action) => {
        return state.set('createStatus', 'FAILURE')
    },
}, initialState);

