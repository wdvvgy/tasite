import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { AuthDialog } from 'component';
import { withRouter, Link } from 'react-router-dom';
import Icon from 'material-ui/Icon';
import PropTypes from 'prop-types';
import { logError } from 'util';

const styles = theme =>  ({
	root: {
		flexGrow: 1,
		position: 'absolute',
		top: '40%',
		left: '40%',
		width: '200px',
		display: 'flex',
		alignItems: 'center',
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	input: {
		margin: theme.spacing.unit,
	},
	button: {
		margin: theme.spacing.unit / 2,
		marginTop: theme.spacing.unit
	},
	icon: {
		margin: theme.spacing.unit / 2,
		marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		color: '#E91E63',
		'&:hover': {
			cursor: 'pointer'
		}
	},
});

class AuthCom extends Component {

	static propTypes = {
		onRegister: PropTypes.func.isRequired,
		onLogin: PropTypes.func.isRequired
	};

	static defaultProps = {
		onRegister: () => logError('onRegister'),
		onLogin: () => logError('onLogin')
	};

	state = {
		mode: true, // true:login, false:register
		email: '',
		pw: '',
		pwCheck: '',
		open: false, // dialog
		dialogIndex: -1,
		dialogMessage: '',
	};

	validationCheck = () => {
		if(this.state.email === ''){
			this.setState({ open: true, dialogMessage: 'EMAIL 을 입력해주세요.' });
			return false;
		}

		if(this.state.email.split('@').length !== 2){
			this.setState({ open: true, dialogMessage: '올바른 EMAIL 형식으로 입력해주세요.' });
			return false;
		}

		if(this.state.pw === ''){
			this.setState({ open: true, dialogMessage: 'Password를 입력해주세요.' });
			return false;
		}

		if(this.state.pw.length < 4){
			this.setState({ open: true, dialogMessage: 'Password가 너무 짧습니다.' });
			return false;
		}

		return true;
	}

	handleRegister = () => {
		if(this.state.mode === true){
			this.setState({ mode: false });
			return;
		}

		if(!this.validationCheck()) return;

		if(this.state.pwCheck === ''){
			this.setState({ open: true, dialogMessage: 'Password를 입력해주세요.' });
			return;
		}

		if(this.state.pwCheck.length < 4){
			this.setState({ open: true, dialogMessage: 'Password가 너무 짧습니다.' });
			return;
		}

		if(this.state.pw !== this.state.pwCheck) {
			this.setState({ open: true, dialogMessage: 'Password가 일치하지 않습니다.' });
			return;
		}

		const formData = {
			email: this.state.email,
			pw: this.state.pw
		};

		this.props.onRegister(formData).then(
			(obj) => {
				if(!obj.message) this.setState({ open: true, dialogMessage: '가입하신 메일로 인증메일이 전송되었습니다. 확인해주세요.'});
				else this.setState({ open: true, dialogMessage: obj.message });
			}
		);
	}

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

	handleDialogClose = () => this.setState({ open: false });

	handleLogin = () => {
		if(this.state.email === ''){
			this.setState({ open: true, dialogMessage: 'EMAIL 을 입력해주세요.' });
			return;
		}

		if(!this.validationCheck()) return;

		const formData = {
			email: this.state.email,
			pw: this.state.pw
		};

		this.props.onLogin(formData).then(
			(obj) => {
				if(!obj.message) this.props.history.push('/');
				else this.setState({ open: true, dialogMessage: obj.message });
			}
		);
	}

	render(){
		const { classes } = this.props;
		const passwordCheckForm = (
			<Grid container justify='center'>
				<FormControl className={classes.margin}>
					<TextField
						required
						type="password"
						label="Password Check"
						name='pwCheck'
						onChange={this.handleChange}
						className={classes.input}
					/>  
				</FormControl>
			</Grid>
		);
		const loginForm = (
			<Button variant="raised" color="primary" className={classes.button} onClick={this.handleLogin}>
				로그인
			</Button>
		);

		return (
			<div>
				{
					this.state.open 
						!== -1
						? <AuthDialog
							open={this.state.open}
							close={this.handleDialogClose}
							dialogMessage={this.state.dialogMessage} /> 
						: ""
				}
				<Grid container className={classes.root}>
					<Grid item xs={12}>
						<Grid container justify='center'>
							<Link to='/'><Button>Home</Button></Link>
							<FormControl className={classes.margin}>
								<TextField
									required
									onChange={this.handleChange}
									label="Lotte Email"
									name='email'
									className={classes.input}
								/>
							</FormControl>
						</Grid>
						<Grid container justify='center'>
							<FormControl className={classes.margin}>
								<TextField
									required
									name='pw'
									onChange={this.handleChange}
									type="password"
									label="Password"
									className={classes.input}
								/>  
							</FormControl>
						</Grid>
						{ this.state.mode === false ? passwordCheckForm : ""}
						<Grid container justify='center' alignItems='center'>
							{ 
								this.state.mode === true 
									? loginForm 
									: <div onClick={() => this.setState({mode: true}) }>
										<Icon className={classes.icon}>keyboard_backspace</Icon>
									</div>
							}
							<Button variant="raised" color="primary" className={classes.button} onClick={this.handleRegister}>
								회원가입
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(withRouter(AuthCom));