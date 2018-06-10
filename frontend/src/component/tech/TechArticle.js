import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

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
				hello
			</div>
		);
	}

};

export default withStyles(styles)(TechArticle);