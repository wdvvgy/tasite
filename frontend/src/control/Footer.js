import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
	footer: {
		backgroundColor: '#f9f9f9',
		bottom: 0,
		textAlign: 'center',
		width: '100%',
		margin: '0 auto'
	},
	footerPaper: {
		padding: '1.1rem'
	}
};

const Footer = ({classes}) => (
    <div className={classes.footer}>
        <footer>
            <Paper className={classes.footerPaper}>
                <Typography variant="headline" component="h4">
                    Footer
                </Typography>
            </Paper>
        </footer>
    </div>
)

export default withStyles(styles)(Footer);