import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import Icon from 'material-ui/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from 'material-ui/Button';
import { BookDialog, FormDialog } from 'component';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	row: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
		},
	},
	tableTh: {
		fontWeight: 'bold',
	},
	button: {
		margin: theme.spacing.unit,
	},
});

class BookTable extends Component {

	state = {
		open: false,
		changeData: null,
		delOpen: false,
		delId: ''
	}

	toggleDialog = (book) => {
		this.setState({ 
			open: !this.state.open ,
			changeData: book
		});
	}

	handleDeleteDialog = (bookId) => {
		this.setState({ 
			delOpen: true,
			delId: bookId
		});
	}

	handleDelete = (callback) => {
		this.props.handleDelete(this.state.delId).then(
			() => {
				this.setState({ delId: '', delOpen: false });
				callback();
			}
		);
	}
	
	handleDeleteDialogClose = () => this.setState({ delOpen: false });

	render() {
		const { classes, book, bookEdit, searchUsers } = this.props;
		
		return (
			<Paper className={classes.root}>
				<FormDialog open={this.state.delOpen} toggleDialog={this.handleDeleteDialogClose} handleDelete={this.handleDelete} handleDeleteDialogClose={this.handleDeleteDialogClose} />
				<BookDialog open={this.state.open} toggleDialog={this.toggleDialog} bookEdit={bookEdit} searchUsers={searchUsers} changeData={this.state.changeData} handleEdit={this.props.handleEdit} />
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell  className={classes.tableTh} component="th">책이름</TableCell>
							<TableCell className={classes.tableTh} component="th">신청자</TableCell>
							<TableCell  className={classes.tableTh} component="th">정보</TableCell>
							<TableCell className={classes.tableTh} component="th">날짜</TableCell>
							<TableCell  className={classes.tableTh} component="th">금액</TableCell>
							<TableCell  className={classes.tableTh} component="th">수정 / 삭제</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							book.map(data => {
								return (
									<TableRow className={classes.row} key={data._id}>
										<TableCell style={{width:'30%'}} >{data.name}</TableCell>
										<TableCell >{data.email}</TableCell>
										<TableCell ><Link to={data.url} target='_blank'>링크</Link></TableCell>
										<TableCell >{data.date.substr(0, 10)}</TableCell>
										<TableCell>{data.price.toLocaleString() + '원'}</TableCell>
										<TableCell style={{padding: 0}} >
											<Button variant="fab" mini color="primary" aria-label="edit" className={classes.button} onClick={() => this.toggleDialog(data)}>
												<Icon>edit_icon</Icon>
											</Button>
											<Button variant="fab" mini aria-label="delete" className={classes.button} onClick={() => this.handleDeleteDialog(data._id)}>
												<DeleteIcon />
											</Button>
										</TableCell>
									</TableRow>
								);
							})
						}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

export default withStyles(styles)(BookTable);
