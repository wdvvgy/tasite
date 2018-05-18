import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";

export const AUTH_CHECK = "AUTH_CHECK";
export const AUTH_CHECK_SUCCESS = "AUTH_CHECK_SUCCESS";
export const AUTH_CHECK_FAILURE = "AUTH_CHECK_FAILURE";

export const AUTH_REGISTER = "AUTH_REGISTER";
export const AUTH_REGISTER_PROCEEDING = "AUTH_REGISTER_PROCEEDING";
export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
export const AUTH_REGISTER_FAILURE = "AUTH_REGISTER_FAILURE";

export const authLogin = (auth) => dispatch => {
    dispatch({type: AUTH_LOGIN});
    return axios.post('/api/auth/login', {
        auth
    }).then((res) => {
        dispatch({type: AUTH_LOGIN_SUCCESS, payload: res.data.token});
    }).catch((error) => {
        dispatch({type: AUTH_LOGIN_FAILURE, payload: error.response.data.message});
    });
}

export const authCheck = (token) => dispatch => {
    dispatch({type: AUTH_CHECK});
    return axios.post('/api/auth/check', { }, { headers: { 'x-access-token': token }
    }).then((res) => {
        dispatch({type: AUTH_CHECK_SUCCESS});
    }).catch((error) => {
        dispatch({type: AUTH_CHECK_FAILURE, payload: error});
    });
}

export const authRegister = (auth) => dispatch => {
    dispatch({type: AUTH_REGISTER});
    return axios.post('/api/auth/register', {
        auth
    }).then((res) => {
        dispatch({type: AUTH_REGISTER_SUCCESS, payload: res});
    }).catch((error) => {
        switch(error.response.data.key) {
            case 'PROCEEDING': dispatch({type: AUTH_REGISTER_PROCEEDING, payload: error.response.data.message}); break;
            case 'EXCEPTION': dispatch({type: AUTH_REGISTER_FAILURE, payload: error.response.data.message}); break;
            default: break;
        }
    });
}

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
        token: '',
    })
})

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
}, initialState)