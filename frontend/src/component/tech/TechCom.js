import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { TechArticle } from 'component';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	button: {
		margin: theme.spacing.unit,
	},
	item: {
		marginBottom: '1.1rem',
		marginRight: '1.1rem'
	}
});

class TechCom extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Grid container justify='flex-end' alignItems='flex-end'>
					<Link to='/tech/write'>
						<Button variant="fab" color="secondary" aria-label="add" className={classes.button}>
							<AddIcon />
						</Button>
					</Link>
				</Grid>
				<Grid
					container
					className={classes.demo}
					alignItems='center'
					direction='row'
					justify='center'
					spacing={16}>
					<Grid item xs={4} className={classes.item}>
						<TechArticle />
					</Grid>
					<Grid item xs={4} className={classes.item}>
						<TechArticle />
					</Grid>
					<Grid item xs={4} className={classes.item}>
						<TechArticle />
					</Grid>
					<Grid item xs={4} className={classes.item}>
						<TechArticle />
					</Grid>
					<Grid item xs={4} className={classes.item}>
						<TechArticle />
					</Grid>
					<Grid item xs={4} className={classes.item}>
						<TechArticle />
					</Grid>
					<Grid item xs={4} className={classes.item}>
						<TechArticle />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(TechCom);
