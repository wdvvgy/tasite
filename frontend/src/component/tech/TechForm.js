import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
	editorClass: {
		padding: '1.1rem',
		minHeight: '500px',
		border: '1px solid #F1F1F1 !important'
	},
	bootstrapRoot: {
		boxShadow: 'none',
		textTransform: 'none',
		borderRadius: 4,
		fontSize: 16,
		padding: '6px 12px',
		border: '1px solid',
		backgroundColor: '#43A047',
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:hover': {
			backgroundColor: '#4CAF50',
		},
		margin: theme.spacing.unit,
		float: 'right',
	},
});

class TechForm extends Component {

	state = { 
		editorState: ''
	};

	onEditorStateChange = (editorState) => {
		this.setState({
		  	editorState,
		});
	};

	handleWrite = () => {
		console.log(this.state.editorState);
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Editor
					editorState={this.state.editorState}
					toolbarClassName="toolbarClassName"
					wrapperClassName="demo-wrapper"
          			editorClassName={classes.editorClass}
					onEditorStateChange={this.onEditorStateChange}
				/>
				<Button
					variant="raised"
					color="primary"
					className={classes.bootstrapRoot}
					onClick={this.handleWrite}>
					글쓰기
				</Button>
			</div>
		);
	}
}

export default withStyles(styles)(TechForm);
