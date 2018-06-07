import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';

const styles = theme => ({
	card: {
		height: 200,
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		marginBottom: '1rem',
		marginTop: '1rem',
		paddingLeft: '1rem',
		paddingRight: '1rem',
	},
	header: {
		height: 30,
		whiteSpace: 'nowrap',
    	overflow: 'hidden',
		textOverflow: 'ellipsis'
	},
	title: {
		height: 30,
		whiteSpace: 'nowrap',
    	overflow: 'hidden',
		textOverflow: 'ellipsis',
		
	},
	ellipsis: {
		whiteSpace: 'nowrap',
    	overflow: 'hidden',
    	textOverflow: 'ellipsis'
	},
	content: {
		
		height: 50,	
		whiteSpace: 'nowrap',
    	overflow: 'hidden',
    	textOverflow: 'ellipsis'
	},
	link: {
		textDecoration: 'none',
	},
	actions: {
		paddingTop: 0
	}
});

class TechList extends Component {
	
	state = { expanded: false };

	handleExpandClick = () => {
	  this.setState({ expanded: !this.state.expanded });
	};
	
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Card className={classes.card}>
					<Link to={`/tech/${this.props.item._id}`} className={classes.link} >
						<CardHeader
							classes={
								{ 
									title: classes.title,
									content: classes.header
								}
							}
							title={this.props.item.title}
							subheader={this.props.item.date.substr(0, 10)}
						/>
						<CardContent className={classes.content}>
							<Typography className={classes.ellipsis}>
								{this.props.item.content}
							</Typography>
						</CardContent>
					</Link>
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

export default withStyles(styles)(TechList);