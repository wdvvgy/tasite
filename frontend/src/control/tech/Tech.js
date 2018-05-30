import React, { Component } from 'react';
import { TechCom, TechForm } from 'component';
import { Route, Switch } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
});

class Tech extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.root}>
					<Grid>
						<Grid container spacing={24} justify='center'>
							<Grid item xs={8}>
								<h1>TECH</h1>
								<hr />
								<Switch>
									<Route path='/tech/write' component={TechForm} />
									<Route path='/tech' component={TechCom} />
								</Switch>
							</Grid>
							
						</Grid>
					</Grid>
				</div>
				
				
			</div>
		);
	}
}

export default withStyles(styles)(Tech);
