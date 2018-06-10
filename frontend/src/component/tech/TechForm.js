import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { LinearProgress } from 'material-ui/Progress';
import Input from '@material-ui/core/Input';

const styles = theme => ({
	editorClass: {
		padding: '1.1rem',
		minHeight: '500px',
		border: '1px solid #F1F1F1 !important',
		zIndex: 0,
	},
	wrapperClass: {
		zIndex: 0,
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
	input: {
		margin: theme.spacing.unit,
		width: '100%',
	},
});

class TechForm extends Component {

	constructor(props){
		super(props);
		const html = '';
		const contentBlock = htmlToDraft(html);
		if (contentBlock) {
			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
			const editorState = EditorState.createWithContent(contentState);
			this.state = {
				title: '',
				editorState,
				loading: false,
			};
		}
	}

	componentWillUnmount() {
		this.setState({ loading: false });
	}

	handleInit = () => this.setState({ title: '', editorState: '', loading: false });

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onEditorStateChange = (editorState) => {
		this.setState({ editorState });
	};

	handleWrite = () => {
		const content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
		const tech = {
			title: this.state.title,
			email: JSON.parse(localStorage.getItem('devblog')).email,
			content: content,
		};
		this.setState({ loading: true });
		this.props.handleWrite(tech).then(
			(success) => {
				this.handleInit();
				alert(success ? '등록되었습니다.' : '오류가 발생하였습니다.');
				this.props.handleInit();
			}
		);
	}

	handleProgress = (callback) => {
		this.setState({ loading: true });
		callback( () => this.setState({ loading: false }) );
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Input
					placeholder="제목"
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
					value={this.state.title}
					onChange={this.handleChange}
					name='title'
				/>
				<Editor
					editorState={this.state.editorState}
					toolbarClassName="toolbarClassName"
					wrapperClassName={classes.wrapperClass}
          			editorClassName={classes.editorClass}
					onEditorStateChange={this.onEditorStateChange}
					localization={{ locale: 'ko' }}
				/>
				<Button
					variant="raised"
					color="primary"
					className={classes.bootstrapRoot}
					onClick={this.handleWrite}>
					글쓰기
				</Button>
				{ this.state.loading && <LinearProgress /> }
			</div>
		);
	}
}

export default withStyles(styles)(TechForm);
