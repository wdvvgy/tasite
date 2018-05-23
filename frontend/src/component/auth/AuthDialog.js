import React from 'react';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const AuthDialog = ({ open, close, dialogMessage }) => (
	<Dialog
		open={open}
		onClose={close}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description">
		<DialogTitle id="alert-dialog-title">{"안내"}</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				{ dialogMessage }
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={close} color="primary" autoFocus>
				확인
			</Button>
		</DialogActions>
	</Dialog>
);

export default AuthDialog;