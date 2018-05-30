import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Header, Book, Tech, Footer, Lunch } from 'control';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { MainCom } from 'component';
import { authCheck, authLogout } from '../modules/auth';
import { logError } from 'util';

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 'auto',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		minWidth: 0, // So the Typography noWrap works
		minHeight: '85vh'
	},
	toolbar: theme.mixins.toolbar,
});

class Main extends Component {

	static propTypes = {
		checkStatus: PropTypes.string,
		authCheck: PropTypes.func,
		auth: PropTypes.bool,
		authLogout: PropTypes.func,
	}

	static defaultProps = {
		checkStatus: '',
		authCheck: () => logError('Main authCheck'),
		auth: false,
		authLogout: () => logError('Main authLogout'),
	}

	state = {
		menu: [
			{ name : 'book', component: Book, isRequired: true },
			{ name : 'tech', component: Tech, isRequired: false },
			{ name : 'lunch', component: Lunch, isRequired: false },
		],
	};

	componentDidMount () {
		const auth = JSON.parse(localStorage.getItem('devblog'));
		if(!auth) return;
		const token = auth.token;
		this.props.authCheck(token);
	}

	componentDidCatch(err, info) {
		if(err) {
			console.log(info);
			alert('오류가 발생하였습니다.');
			this.handleLogout();
		}
	}

	handleLogout = () => {
		this.props.authLogout();
		localStorage.removeItem('devblog');
		this.props.history.push('/');
	}

	render(){
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.root}>
					<Header menu={this.state.menu} checkStatus={this.props.auth} handleLogout={this.handleLogout} />
					<div className={classes.toolbar} />
				</div>
				<div className={classes.content}>
					<Route exact path='/' component={MainCom} />
					{
						this.state.menu.map((menu, idx) => 
							!menu.isRequired
								? <Route path={`/${menu.name}`} component={menu.component} key={idx} /> 
								: this.props.auth 
									? <Route path={`/${menu.name}`} component={menu.component} key={idx} /> 
									: ''
						)
					}
				</div>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const auth = state.auth.toJS();
	return {
		checkStatus: auth.check.status,
		auth: auth.check.auth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		authCheck: (token) => {
			return dispatch(authCheck(token));
		},
		authLogout: () => {
			return dispatch(authLogout());
		}
	};
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Main)));
