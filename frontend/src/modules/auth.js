import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import axios from 'axios';
import { addTokenHeader } from '../util';

const AUTH_LOGIN = "AUTH_LOGIN";
const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";

const AUTH_CHECK = "AUTH_CHECK";
const AUTH_CHECK_SUCCESS = "AUTH_CHECK_SUCCESS";
const AUTH_CHECK_FAILURE = "AUTH_CHECK_FAILURE";

const AUTH_REGISTER = "AUTH_REGISTER";
const AUTH_REGISTER_PROCEEDING = "AUTH_REGISTER_PROCEEDING";
const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
const AUTH_REGISTER_FAILURE = "AUTH_REGISTER_FAILURE";

const AUTH_USERS = "AUTH_USERS";
const AUTH_USERS_SUCCESS = "AUTH_USERS_SUCCESS";
const AUTH_USERS_FAILURE = "AUTH_USERS_FAILURE";

const url = '/api/auth';

export const authLogin = (auth) => dispatch => {
	dispatch({type: AUTH_LOGIN});
	return axios.post(url + '/login', {
		auth
	}).then((res) => {
		dispatch({type: AUTH_LOGIN_SUCCESS, payload: res.data.token});
	}).catch((error) => {
		dispatch({type: AUTH_LOGIN_FAILURE, payload: error.response.data.message});
	});
};

export const authCheck = (token) => dispatch => {
	dispatch({type: AUTH_CHECK});
	return axios.post(url + '/check', { }, addTokenHeader(token)
	).then((res) => {
		dispatch({type: AUTH_CHECK_SUCCESS});
	}).catch((error) => {
		dispatch({type: AUTH_CHECK_FAILURE, payload: error});
	});
};

export const authRegister = (auth) => dispatch => {
	dispatch({type: AUTH_REGISTER});
	return axios.post(url + '/register', {
		auth
	}).then((res) => {
		dispatch({type: AUTH_REGISTER_SUCCESS, payload: res.data.message});
	}).catch((error) => {
		switch(error.response.data.key) {
		case 'ALREADY JOINED': dispatch({type: AUTH_REGISTER_FAILURE, payload: error.response.data.message}); break;
		case 'PROCEEDING': dispatch({type: AUTH_REGISTER_PROCEEDING, payload: error.response.data.message}); break;
		case 'EXCEPTION': dispatch({type: AUTH_REGISTER_FAILURE, payload: error.response.data.message}); break;
		default: break;
		}
	});
};

export const authGet = (token) => dispatch => {
	dispatch({type: AUTH_USERS});
	return axios.get(url, addTokenHeader(token)
	).then((res) => {
		dispatch({type: AUTH_USERS_SUCCESS, payload: res.data.users});
	}).catch((error) => {
		dispatch({type: AUTH_USERS_FAILURE, payload: error});
	});
};

const initialState = Map({
	login: Map({
		status: 'INIT',
		token: '',
		desc: ''
	}),
	check: Map({
		status: 'INIT'
	}),
	register: Map({
		status: 'INIT',
		desc: '',
	}),
	users: Map({
		status: 'INIT',
		data: List([

		])
	})
});

export default handleActions({
	/* Login */
	[AUTH_LOGIN]: (state, action) => {
		return state.setIn(['login', 'status'], 'WAITING');
	},
	[AUTH_LOGIN_SUCCESS]: (state, action) => {
		return state
			.setIn(['login', 'status'], 'SUCCESS')
			.setIn(['login', 'token'], action.payload);
	},
	[AUTH_LOGIN_FAILURE]: (state, action) => {
		return state
			.setIn(['login', 'status'], 'FAILURE')
			.setIn(['login', 'desc'], action.payload);
	},

	/* Check */
	[AUTH_CHECK]: (state, action) => {
		return state.setIn(['check', 'status'], 'WAITING');
	},
	[AUTH_CHECK_SUCCESS]: (state, action) => {
		return state.setIn(['check', 'status'], 'SUCCESS');
	},
	[AUTH_CHECK_FAILURE]: (state, action) => {
		return state.setIn(['check', 'status'], 'FAILURE');
	},

	/* Register */
	[AUTH_REGISTER]: (state, action) => {
		return state.setIn(['register', 'status'], 'WAITING');
	},
	[AUTH_REGISTER_PROCEEDING]: (state, action) => {
		return state
			.setIn(['register', 'status'], 'PROCEEDING')
			.setIn(['register', 'desc'], action.payload);
	},
	[AUTH_REGISTER_SUCCESS]: (state, action) => {
		return state
			.setIn(['register', 'status'], 'SUCCESS')
			.setIn(['register', 'desc'], action.payload);
	},
	[AUTH_REGISTER_FAILURE]: (state, action) => {
		return state
			.setIn(['register', 'status'], 'FAILURE')
			.setIn(['register', 'desc'], action.payload);
	},

	/* GET USERS */
	[AUTH_USERS]: (state, action) => {
		return state.setIn(['users', 'status'], 'WAITING');
	},
	[AUTH_USERS_SUCCESS]: (state, action) => {
		return state
			.setIn(['users', 'status'], 'SUCCESS')
			.setIn(['users', 'data'], action.payload);
	},
	[AUTH_USERS_FAILURE]: (state, action) => {
		return state
			.setIn(['users', 'status'], 'FAILURE');
	},
}, initialState);