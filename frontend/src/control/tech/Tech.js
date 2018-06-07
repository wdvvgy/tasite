import React, { Component } from 'react';
import { TechCom, TechForm, TechArticle } from 'component';
import { Route, Switch, withRouter } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logError } from 'util';
import { techWrite, techGet, techEdit, techDelete } from '../../modules/tech';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
});

class Tech extends Component {

	static propTypes = {
		writeStatus: PropTypes.string,
		getStatus: PropTypes.string,
		editStatus: PropTypes.string,
		delStatus: PropTypes.string,
		tech: PropTypes.array,
		onWrite: PropTypes.func.isRequired,
		techGet: PropTypes.func.isRequired
	}

	static defaultProps = {
		writeStatus: '',
		getStauts: '',
		editStatus: '',
		delStatus: '',
		tech: [],
		onWrite: () => logError('Tech onWrite'),
		techGet: () => logError('Tech techGet'),
	}

	componentDidMount(){
		this.props.techGet();
	}

	shouldComponentUpdate(nextProps, nextState){
		if(this.props.location.pathname !== nextProps.location.pathname) return true;
		if(this.props.tech.length === 0 && nextProps.tech.length === 0) return false;
		return this.props.tech !== nextProps.tech;
	}

	handleInit = () => {
		if(this.props.location.pathname !== '/tech') {
			this.props.history.push('/tech');
			this.props.techGet();
		}
	}

	handleWrite = (tech) => {
		const token = JSON.parse(localStorage.getItem('devblog')).token;
		return this.props.onWrite({ tech, token }).then(
			() => {
				if(this.props.writeStatus !== 'SUCCESS') return false;
				return true;
			}
		);
	}
	
	handleEdit = ({ techId, tech }) => {
		const token = JSON.parse(localStorage.getItem('devblog')).token;
		return this.props.techEdit({ techId, tech, token }).then(
			() => {
				if(this.props.editStatus !== 'SUCCESS') return false;
				this.props.techGet();
				return true;
			}
		);
	}

	handleDelete = (techId) => {
		const token = JSON.parse(localStorage.getItem('devblog')).token;
		return this.props.techDelete({ techId, token }).then(
			() => {
				if(this.props.delStatus !== 'SUCCESS') return false;
				this.props.techGet();
				return true;
			}
		);
	}

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
									<Route path='/tech/write' render={(props) => (<TechForm handleWrite={this.handleWrite} handleInit={this.handleInit} />)} />
									<Route path='/tech/:id' render={(props) => (<TechArticle />)} />
									<Route exact path='/tech' render={(props) => (<TechCom tech={this.props.tech} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />)} />
								</Switch>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const tech = state.tech.toJS();
	return {
		writeStatus: tech.writeStatus,
		getStatus: tech.getStatus,
		editStatus: tech.editStatus,
		delStatus: tech.delStatus,
		tech: tech.tech,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onWrite: ({tech, token}) => {
			return dispatch(techWrite({ tech, token }));
		},
		techGet: () => {
			return dispatch(techGet());
		},
		techEdit: ({techId, tech, token}) => {
			return dispatch(techEdit({techId, tech, token}));
		},
		techDelete: ({techId, token}) => {
			return dispatch(techDelete({techId, token}));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Tech)));
