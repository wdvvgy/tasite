// import React from 'react';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { authCheck } from '../modules/auth';
// import { logError } from 'util';

// export function requireAuthentication(Component){

// 	class AuthenticatedComponent extends React.Component {

// 		static propTypes = {
// 			checkStatus: PropTypes.string,
// 			authCheck: PropTypes.func
// 		}

// 		static defaultProps = {
// 			checkStatus: '',
// 			authCheck: () => logError('authCheck'),
// 		}

// 		componentDidMount () {
// 			this.setState({ checkStatus: '' });
// 			let auth = JSON.parse(localStorage.getItem('devblog'));
// 			if(!auth){
// 				this.props.history.push('/auth');
// 				return;
// 			}
// 			this.props.authCheck(auth.token);
// 		}

// 		render(){
// 			return (
// 				<div>
// 					{ this.props.checkStatus === 'SUCCESS' ? <Component {...this.props} /> : <div /> }
// 				</div>
// 			);
// 		}
// 	}

// 	const mapStateToProps = (state) => {
// 		const auth = state.auth.toJS();
// 		return {
// 			checkStatus: auth.check.status
// 		};
// 	};

// 	const mapDispatchToProps = (dispatch) => {
// 		return {
// 			authCheck: (token) => {
// 				return dispatch(authCheck(token));
// 			}
// 		};
// 	};

// 	return connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthenticatedComponent));
// }