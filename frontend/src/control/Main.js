import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Header, Book, Tech, Footer } from 'control';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { MainCom } from 'component';
import { requireAuthentication } from 'component';
import { authGet } from '../modules/auth';

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

	state = {
		menu: [
			{ name : 'book', component: Book },
			{ name : 'tech', component: Tech }
		],
		users: [

		]
	};

	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	if(nextProps.users !== prevState.users) {
	// 		return {
	// 			users: nextProps.users
	// 		};
	// 	}
	// 	return null;
	// }

	// shouldComponentUpdate(nextProps, nextState) {
	// 	if(this.state.users !== this.state.nextState) return false;
	// 	return true;
	//   }

	render(){
		const { classes } = this.props;

		return (
			<div>
				<div className={classes.root}>
					<Header menu={this.state.menu}/>
					<div className={classes.toolbar} />
				</div>
				<div className={classes.content}>
					<Route exact path='/' component={MainCom} />
					<Route path='/book' component={requireAuthentication(Book)} />
					<Route path='/tech' component={Tech} />
				</div>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const auth = state.auth.toJS();
	return {
		usersStatus: auth.users.status,
		users: auth.users.data
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		authGet: (token) => {
			return dispatch(authGet(token));
		},
		
	};
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Main));
