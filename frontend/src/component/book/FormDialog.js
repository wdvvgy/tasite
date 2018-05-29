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
import { LinearProgress } from 'material-ui/Progress';
import { logError } from 'util';

class FormDialog extends Component {

	static propTypes = {
		handleDeleteDialogClose: PropTypes.func,
		handleDelete: PropTypes.func
	}

	static defaultProps = {
		handleDeleteDialogClose: () => logError('handleDeleteDialogClose'),
		handleDelete: () => logError('handleDelete'),
	}

	state = { loading: false };

	handleProgress = (callback) => {
		this.setState({ loading: true });
		callback( () => this.setState({ loading: false }) );
	}

	render() {
		const { fullScreen, handleDeleteDialogClose, handleDelete } = this.props;
		
		return (
			<Dialog
				fullScreen={fullScreen}
				open={this.props.open}
				onClose={ handleDeleteDialogClose }
				aria-labelledby="responsive-dialog-title">
				<DialogTitle id="responsive-dialog-title">삭제하시겠습니까?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						삭제하시면 데이터가 영구적으로 삭제됩니다.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDeleteDialogClose} color="primary">
						취소
					</Button>
					<Button onClick={() => this.handleProgress(handleDelete)} color="primary" autoFocus>
						확인
					</Button>
				</DialogActions>
				{ this.state.loading && <LinearProgress /> }
			</Dialog>
		);
	}
}

export default withMobileDialog()(FormDialog);
