import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AuthCom } from 'component';
import { connect } from 'react-redux';
import { authLogin, authRegister } from '../../modules/auth';
import { logError } from 'util';

class Auth extends Component {

    static propTypes = {
        loginStatus: PropTypes.string,
        loginToken: PropTypes.string,
        loginDesc: PropTypes.string,
        registerStatus: PropTypes.string,
        registerToken: PropTypes.string,
        registerDesc: PropTypes.string,
        authLogin: PropTypes.func.isRequired,
        authRegister: PropTypes.func.isRequired
    }

    static defaultProps = {
        loginStatus: '',
        loginToken: '',
        loginDesc: '',
        registerStatus: '',
        registerToken: '',
        registerDesc: '',
        authLogin: () => logError('loginRequest'),
        authRegister: () => logError('authRegister')
    }

	handleLogin = (auth) => {
        return this.props.authLogin(auth).then(
            () => {
                switch(this.props.loginStatus) {
                    case 'SUCCESS':
                        const token = this.props.loginToken;
                        localStorage.setItem('devblog', JSON.stringify({ email: auth.email, token: token }));
                        return { };
                    default: 
                        return { message: this.props.loginDesc };
                }
            }
        );
    }

    handleRegister = (auth) => {
        return this.props.authRegister(auth).then(
            () => {
                switch(this.props.registerStatus) {
                    case 'PROCEEDING':
                    case 'FAILURE':
                        return { message: this.props.registerDesc };
                    case 'SUCCESS':
                        return { };
                    default: return { };
                }
            }
        );
	}
	
	render(){
        return (
          <div>
              <AuthCom onLogin={this.handleLogin} onRegister={this.handleRegister} />
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth.toJS();
    return {
        loginStatus: auth.login.status,
        loginToken: auth.login.token,
        loginDesc: auth.login.desc,
        registerStatus: auth.register.status,
        registerToken: auth.register.token,
        registerDesc: auth.register.desc,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authLogin: (formData) => {
            return dispatch(authLogin(formData));
        },
        authRegister: (formData) => {
            return dispatch(authRegister(formData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
