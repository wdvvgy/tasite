import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from 'classnames';

const styles = theme => ({
	card: {
	  	maxWidth: 400,
	},
	media: {
		height: 194,
		
	},
	actions: {
	  	display: 'flex',
	},
	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
		marginLeft: 'auto',
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
});

class TechArticle extends Component {
	
	state = { expanded: false };

	handleExpandClick = () => {
	  this.setState({ expanded: !this.state.expanded });
	};
	
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Card className={classes.card}>
					<CardHeader
						avatar='writer'
						title="title"
						subheader="date" />
					<CardMedia
						className={classes.media}
						image="/static/images/cards/paella.jpg"
						title="Contemplative Reptile"
					/>
					<CardContent>
						<Typography component="p">
						This impressive paella is a perfect party dish and a fun meal to cook together with
						your guests. Add 1 cup of frozen peas along with the mussels, if you like.
						</Typography>
					</CardContent>
					<CardActions className={classes.actions} disableActionSpacing>
						<IconButton aria-label="Add to favorites">
							<FavoriteIcon />
						</IconButton>
					</CardActions>
				</Card>
			</div>
		);
	}

};

export default withStyles(styles)(TechArticle);