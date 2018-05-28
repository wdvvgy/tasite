import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme =>  ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	flex: {
		marginLeft: 30,
		flex: 1,
	},
	whiteLink: {
		color: 'white',
		textDecoration: 'none'
	},
	activeLink: {
		backgroundColor: 'white',
		paddingTop: '1.2rem',
		paddingBottom: '1.5rem',
		height: '100%',
		top: 0,
		color: '#2962FF',
	}
});

const LeftAppBar = ({ classes }) => (
	<Typography variant="title" color="inherit" className={classes.flex}>
		<Link className={classes.whiteLink} to='/'>TA TEAM SITE</Link>
	</Typography>
);

const LoginLink = ({ classes }) => (
	<Link className={classes.whiteLink} to='/auth'>
		<Button color="inherit">Login</Button>
	</Link>
);

const LogoutBtn = ({ classes, handleLogout }) => (
	<span onClick={handleLogout}>
		<Button color='inherit'>Logout</Button>
	</span>
);

const RightAppBar = ({ classes, menu, handleLogout, checkStatus }) => (
	<div>
		<NavLink exact to='/' className={classes.whiteLink} activeClassName={classes.activeLink}>
			<Button color='inherit'>Home</Button>
		</NavLink>
		{
			menu.map((menuItem, i) => 
				(
					!menuItem.isRequired
						? <NavLink to={`/${menuItem.name}`} className={classes.whiteLink} activeClassName={classes.activeLink} key={i}>
							<Button color='inherit'>{menuItem.name}</Button>
						</NavLink> 
						: checkStatus
							? <NavLink to={`/${menuItem.name}`} className={classes.whiteLink} activeClassName={classes.activeLink} key={i}>
								<Button color='inherit'>{menuItem.name}</Button>
							</NavLink>
							: ''
				)
			)
		}
		{ checkStatus ? <LogoutBtn classes={classes} handleLogout={handleLogout} /> : <LoginLink classes={classes} /> }
	</div>
);

const HeaderCom = ({ classes, menu, handleLogout, checkStatus }) => (
	<AppBar position="absolute" className={classes.appBar}>
		<Toolbar>
			<LeftAppBar classes={classes} />
			<RightAppBar classes={classes} menu={menu} handleLogout={handleLogout} checkStatus={checkStatus} />
		</Toolbar>
	</AppBar>
);

export default withStyles(styles)(HeaderCom);
