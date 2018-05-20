import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Header, Book, Tech, Footer } from 'control';
import { Route } from 'react-router-dom';
import { MainCom } from 'component';
import { requireAuthentication } from 'component';


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

	render(){
		const { classes } = this.props;
		const menu = [
			{ name : 'book', component: Book },
			{ name : 'tech', component: Tech }
		];

		return (
			<div>
				<div className={classes.root}>
					<Header menu={menu}/>
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

export default withStyles(styles)(Main);
