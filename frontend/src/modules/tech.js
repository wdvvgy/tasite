import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import axios from 'axios';
import { addTokenHeader } from '../util';

export const TECH_GET = "tech/get";
export const TECH_GET_SUCCESS = "tech/get/success";
export const TECH_GET_FAILURE = "tech/get/failure";

export const TECH_WRITE = "tech/create";
export const TECH_WRITE_SUCCESS = "tech/create/success";
export const TECH_WRITE_FAILURE = "tech/create/failure";

export const TECH_EDIT = "tech/edit";
export const TECH_EDIT_SUCCESS = "tech/edit/success";
export const TECH_EDIT_FAILURE = "tech/edit/failure";

export const TECH_DELETE = "tech/delete";
export const TECH_DELETE_SUCCESS = "tech/delete/success";
export const TECH_DELETE_FAILURE = "tech/delete/failure";

const url = '/api/tech';

export const techGet = () => dispatch => {
	dispatch({type: TECH_GET});
	return axios.get(url)
		.then((res) => {
			dispatch({type: TECH_GET_SUCCESS, payload: res.data.tech});
		}).catch((error) => {
			dispatch({type: TECH_GET_FAILURE, payload: error});
		});
};

export const techWrite = ({ tech, token }) => dispatch => {
	dispatch({type: TECH_WRITE});
	return axios.post(url, { tech }, addTokenHeader(token)
	).then((res) => {
		dispatch({type: TECH_WRITE_SUCCESS, payload: res});
	}).catch((error) => {
		dispatch({type: TECH_WRITE_FAILURE, payload: error});
	});
};

export const techEdit = ({ techId, tech, token }) => dispatch => {
	dispatch({ type: TECH_EDIT });
	return axios.put(url + '/' + techId, { tech }, addTokenHeader(token)
	).then((res) => {
		dispatch({ type: TECH_EDIT_SUCCESS, payload: res });
	}).catch((error) => {
		dispatch({ type: TECH_EDIT_FAILURE, payload: error});
	});
};

export const techDelete = ({ techId, token }) => dispatch => {
	dispatch({ type: TECH_DELETE });
	return axios.delete(url + '/' + techId, addTokenHeader(token)
	).then((res) => {
		dispatch({ type: TECH_DELETE_SUCCESS, payload: res });
	}).catch((error) => {
		dispatch({ type: TECH_DELETE_FAILURE , payload: error });
	});
};

const initialState = Map({
	writeStatus: 'INIT',
	getStatus: 'INIT',
	editStatus: 'INIT',
	delStatus: 'INIT',
	tech: List([

	]),
});

export default handleActions({
	[TECH_GET]: (state, action) => {
		return state.set('getStatus', 'WAITING');
	},
	[TECH_GET_SUCCESS]: (state, action) => {
		return state
			.set('getStatus', 'SUCCESS')
			.set('tech', action.payload);
	},
	[TECH_GET_FAILURE]: (state, action) => {
		return state.set('getStatus', 'FAILURE');
	},
	[TECH_WRITE]: (state, action) => {
		return state.set('writeStatus', 'WAITING');
	},
	[TECH_WRITE_SUCCESS]: (state, action) => {
		return state.set('writeStatus', 'SUCCESS');
	},
	[TECH_WRITE_FAILURE]: (state, action) => {
		return state.set('writeStatus', 'FAILURE');
	},
	[TECH_EDIT]: (state, action) => {
		return state.set('editStatus', 'WAITING');
	},
	[TECH_EDIT_SUCCESS]: (state, action) => {
		return state.set('editStatus', 'SUCCESS');
	},
	[TECH_EDIT_FAILURE]: (state, action) => {
		return state.set('editStatus', 'FAILURE');
	},
	[TECH_DELETE]: (state, action) => {
		return state.set('delStatus', 'WAITING');
	},
	[TECH_DELETE_SUCCESS]: (state, action) => {
		return state.set('delStatus', 'SUCCESS');
	},
	[TECH_DELETE_FAILURE]: (state, action) => {
		return state.set('delStatus', 'FAILURE');
	},
}, initialState);

