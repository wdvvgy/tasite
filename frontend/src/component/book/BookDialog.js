import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { LinearProgress } from 'material-ui/Progress';
import { logError } from 'util';

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
        name: '',
        email: '',
        url: '',
        date: '',
        loading: false
    }

    handleInit = () => {
        this.setState({
            name: '',
            email: '',
            url: '',
            date: '',
            loading: false
        });
    }

    handleValidation = () => {
        if(this.state.name === ''){
            alert('책이름을 입력해주세요');
            return false;
        }

        if(this.state.email === ''){
            alert('신청자를 입력해주세요.');
            return false;
        }

        if(this.state.url === ''){
            alert('URL을 입력해주세요.');
            return false;
        }

        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if(month < 10) month = '0' + month;
        const day = date.getDate();
        const today = year + '-' + month + '-' + day;
        if(this.state.date > today){
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

    render() {
        const { fullScreen } = this.props;
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if(month < 10) month = '0' + month;
        const day = date.getDate();
        const today = year + '-' + month + '-' + day;
        
        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.props.open}
                    onClose={this.props.toggleDialog}
                    aria-labelledby="responsive-dialog-title">
                    
                    <DialogTitle id="responsive-dialog-title">
                        
                        도서신청
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            각 항목을 입력해주세요.
                        </DialogContentText>
                        <TextField autoFocus margin="dense" name="name" label="책이름" type="text" fullWidth required
                            onChange={this.handleChange} />
                        <TextField margin="dense" name="email" label="신청자" type="text" fullWidth required
                            onChange={this.handleChange} />
                        <TextField margin="dense" name="url" label="URL" type="text" fullWidth required
                            onChange={this.handleChange} />
                        <TextField margin="dense" name="date" label="날짜" type="date" fullWidth required
                            onChange={this.handleChange} defaultValue={today} />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.toggleDialog} color="primary">
                            취소
                        </Button>
                        <Button onClick={this.handleRegister} color="primary" autoFocus>
                            등록
                        </Button>
                        
                    </DialogActions>
                    { this.state.loading && <LinearProgress /> }
                </Dialog>
            </div>
        );
    }
}

export default withMobileDialog()(BookDialog);
