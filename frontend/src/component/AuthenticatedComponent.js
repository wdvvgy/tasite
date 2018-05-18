import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheck } from '../modules/auth';
import { logError } from 'util';

export function requireAuthentication(Component){

    class AuthenticatedComponent extends React.Component {

        static propTypes = {
            checkStatus: PropTypes.string,
            authCheck: PropTypes.func
        }

        static defaultProps = {
            checkStatus: '',
            authCheck: () => logError('authCheck'),
        }

        static getDerivedStateFromProps(nextProps, prevState) {
            if(nextProps.checkStatus !== prevState.checkStatus) return { checkStatus: nextProps.checkStatus };
            return null;
        }

        state = {
            checkStatus: ''
        }

        componentDidMount () {
            this.setState({
                checkStatus: ''
            });
            let auth = JSON.parse(localStorage.getItem('devblog'));
            if(!auth){
                this.props.history.push('/auth');
                return;
            }
            this.props.authCheck(auth.token);
        }

        shouldComponentUpdate(nextProps, nextState) {
            if(this.state.checkStatus !== nextProps.checkStatus) {
                return true;
            }
            return true;
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            let auth = JSON.parse(localStorage.getItem('devblog'));
            if(!auth){
                this.props.history.push('/auth');
                return;
            }
        }

        render(){
            return (
                <div>
                    { this.state.checkStatus === 'SUCCESS' ? <Component {...this.props} /> : <div /> }
                </div>
            )
        }
    }

    const mapStateToProps = (state) => {
        const auth = state.auth.toJS();
        return {
            checkStatus: auth.check.status
        };
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            authCheck: (token) => {
                return dispatch(authCheck(token));
            }
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthenticatedComponent));
}