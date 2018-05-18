import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BookTable, BookDialog } from 'component';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class BookCom extends Component {
    
    static propTypes = {
        bookCreate: PropTypes.func.isRequired,
        book: PropTypes.array,
    }
;
    static defaultProps = {
        bookCreate: () => console.warn('BookCom bookCreate'),
        book: [ ],
    };

    state = {
        open: false
    };

    toggleDialog = () => this.setState({ open: !this.state.open });
    
	render() {
        console.log('bookcom render');
        const { classes } = this.props;

		return (
            <div className={classes.root}>
                <BookDialog open={this.state.open} toggleDialog={this.toggleDialog} bookCreate={this.props.bookCreate} />
                <Grid>
                    <Grid container spacing={24} justify='center'>
                        <Grid item xs={8}>
                            <h1>도서관리</h1>
                            <hr />
                            <Grid container justify='flex-end' alignItems='flex-end'>
                                <Button variant="fab" color="secondary" aria-label="add" className={classes.button}
                                    onClick={this.toggleDialog}>
                                    <AddIcon />
                                </Button>
                            </Grid>
                            <BookTable book={this.props.book} />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
			
		);
	}
}

export default withStyles(styles)(BookCom);
