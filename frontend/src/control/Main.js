import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Header, Book, Tech, Footer } from 'control';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { MainCom } from 'component';
import { authCheck } from '../modules/auth';
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
	},
	toolbar: theme.mixins.toolbar,
});

class Main extends Component {

	static propTypes = {
		checkStatus: PropTypes.string,
		authCheck: PropTypes.func
	}

	static defaultProps = {
		checkStatus: '',
		authCheck: () => logError('Main authCheck'),
	}

	state = {
		menu: [
			{ name : 'book', component: Book, isRequired: true },
			{ name : 'tech', component: Tech, isRequired: false }
		],
		auth: false
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.checkStatus !== 'SUCCESS') {
			return { auth: false };
		};
		return null;
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.checkStatus === 'SUCCESS') return true;
		return false;
	}

	componentDidMount () {
		const auth = JSON.parse(localStorage.getItem('devblog'));
		if(!auth) return;
		const token = auth.token;
		this.props.authCheck(token).then(() => {
			if(this.props.checkStatus !== 'SUCCESS') return;
			this.setState({ auth: true });
		});
	}

	handleLogout = () => {
		this.setState({ auth: false });
		localStorage.removeItem('devblog');
		this.props.history.push('/');
	}

	render(){
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.root}>
					<Header menu={this.state.menu} checkStatus={this.state.auth} handleLogout={this.handleLogout} />
					<div className={classes.toolbar} />
				</div>
				<div className={classes.content}>
					<Route exact path='/' component={MainCom} />
					{
						this.state.menu.map((menu, idx) => 
							(
								!menu.isRequired
									? <Route path={`/${menu.name}`} component={menu.component} key={idx} /> 
									: this.state.auth 
										? <Route path={`/${menu.name}`} component={menu.component} key={idx} /> 
										: ''
							)
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		authCheck: (token) => {
			return dispatch(authCheck(token));
		},
	};
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Main));
