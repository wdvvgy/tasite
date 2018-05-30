import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	withMobileDialog
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { LinearProgress } from 'material-ui/Progress';
import { logError } from 'util';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';

class BookDialog extends Component {

	static propTypes = {
		open: PropTypes.bool,
		toggleDialog: PropTypes.func
	}

	static defaultProps = {
		open: false,
		toggleDialog: () => logError('open'),
	}

	state = {
		_id: '',
		name: '',
		email: '',
		url: '',
		date: '',
		loading: false,
		price: 0,
		users: [ ]
	}

	componentDidCatch(err, info) {
		if(err) {
			console.log(info);
			alert('오류가 발생하였습니다.');
			this.props.history.push('/');
		}
	}

	handleInit = () => {
		this.setState({
			name: '',
			email: '',
			url: '',
			date: '',
			loading: false,
			price: 0
		});
	}

	handleValidation = () => {
		if(this.state.name === '') {
			alert('책이름을 입력해주세요');
			return false;
		}

		if(this.state.email === '') {
			alert('신청자를 입력해주세요.');
			return false;
		}

		if(this.state.url === '') {
			alert('URL을 입력해주세요.');
			return false;
		}

		if(this.state.price <= 0) {
			alert('금액을 확인해주세요.');
			return false;
		}

		const date = new Date();
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		if(month < 10) month = '0' + month;
		const day = date.getDate();
		const today = year + '-' + month + '-' + day;
		if(this.state.date.substr(0, 10) > today){
			alert('날짜는 오늘을 넘어갈 수 없습니다.');
			return false;
		}
		return true;
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value }); 
	
	handleRegister = () => {
		let book = {
			name: this.state.name,
			email: this.state.email,
			url: this.state.url,
			date: '',
			price: this.state.price,
		};
		if(this.state.date === '') {
			const date = new Date();
			const year = date.getFullYear();
			let month = date.getMonth() + 1;
			if(month < 10) month = '0' + month;
			const day = date.getDate();
			const today = year + '-' + month + '-' + day;
			this.setState({ date: today });
			book.date = today;
		} else {
			book.date = this.state.date;
		}

		if(!this.handleValidation()) return;
		this.setState({ loading: true });
		this.props.bookCreate(book).then(
			(success) => {
				this.handleInit();
				alert(success ? '등록되었습니다.' : '오류가 발생하였습니다.');
				this.props.toggleDialog();
			}
		);
	}

	handleLoad = () => {
		const token = JSON.parse(localStorage.getItem('devblog')).token;
		this.props.searchUsers(token).then((users) => {
			this.setState({ users: users });
		});

		const book = this.props.changeData;
		if(!book) return;
		this.setState({
			_id: book._id,
			name: book.name,
			email: book.email,
			url: book.url,
			date: book.date,
			price: book.price,
		});
	}

	handleEdit = () => {
		const book = {
			_id: this.state._id,
			name: this.state.name,
			email: this.state.email,
			url: this.state.url,
			date: this.state.date,
			price: this.state.price
		};
		if(!this.handleValidation()) return;
		this.setState({ loading: true });
		this.props.handleEdit({ bookId: book._id, book }).then(
			(success) => {
				this.handleInit();
				alert(success ? '수정되었습니다.' : '오류가 발생하였습니다.');
				this.props.toggleDialog();
			}
		);
	}

	render() {
		const { fullScreen } = this.props;
		const date = new Date();
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		if(month < 10) month = '0' + month;
		const day = date.getDate();
		const today = year + '-' + month + '-' + day;
		
		return (
			<Dialog
				fullScreen={fullScreen}
				open={this.props.open}
				onClose={this.props.toggleDialog}
				aria-labelledby="responsive-dialog-title"
				onEnter={this.handleLoad}>
				
				<DialogTitle id="responsive-dialog-title">
					도서신청
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						각 항목을 입력해주세요.
					</DialogContentText>
					<TextField 
						autoFocus margin="dense" 
						name="name" 
						label="책이름" 
						type="text" 
						fullWidth required
						value={this.state.name}
						onChange={this.handleChange} />
					<TextField
						id="select-currency"
						margin='dense'
						name='email'
						select
						label="신청자"
						value={this.state.email}
						onChange={this.handleChange}
						fullWidth required>
						{
							this.state.users.map((user, idx) => (
								<MenuItem key={user._id} value={user.email + ` (${user.name})`}>
									{user.email + ` (${user.name})`}
								</MenuItem>
							))
						}
					</TextField>
					<TextField 
						margin="dense"
						name="url" 
						label="URL" 
						type="text" 
						fullWidth required
						value={this.state.url}
						onChange={this.handleChange} />
					<TextField 
						margin="dense" 
						name="date" 
						label="날짜" 
						type="date" 
						fullWidth required
						value={this.state.date !== '' ? this.state.date.substr(0, 10) : today}
						onChange={this.handleChange}/>
					<TextField 
						margin="dense" 
						name="price" 
						label="금액" 
						type="number" 
						fullWidth required
						value={this.state.price}
						onChange={this.handleChange}/>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.toggleDialog} color="primary">
						취소
					</Button>
					<Button onClick={this.props.handleEdit ? this.handleEdit : this.handleRegister} color="primary" autoFocus>
						{ this.props.handleEdit ? '수정' : '등록' }
					</Button>	
				</DialogActions>
				{ this.state.loading && <LinearProgress /> }
			</Dialog>
		);
	}
}

export default withMobileDialog()(withRouter(BookDialog));
