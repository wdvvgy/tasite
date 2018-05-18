import React from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import Icon from 'material-ui/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from 'material-ui/Button';

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

const BookTable = ({book, classes}) => (
    <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow >
                    <TableCell className={classes.tableTh} component="th">책이름</TableCell>
                    <TableCell className={classes.tableTh} component="th">신청자</TableCell>
                    <TableCell className={classes.tableTh} component="th">정보</TableCell>
                    <TableCell className={classes.tableTh} component="th">날짜</TableCell>
                    <TableCell className={classes.tableTh} component="th" style={{padding:'0px'}}></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    book.map(n => {
                        return (
                            <TableRow className={classes.row} key={n._id}>
                                <TableCell>{n.name}</TableCell>
                                <TableCell>{n.email}</TableCell>
                                <TableCell><Link to={n.url} target='_blank'>{n.url}</Link></TableCell>
                                <TableCell>{n.date.substr(0, 10)}</TableCell>
                                <TableCell style={{padding:'0px'}}>
                                    <Button variant="fab" mini color="primary" aria-label="edit" className={classes.button}>
                                        <Icon>edit_icon</Icon>
                                    </Button>
                                    <Button variant="fab" mini aria-label="delete" className={classes.button}>
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

export default withStyles(styles)(BookTable);
