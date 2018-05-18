import React, { Component } from 'react';
import { HeaderCom } from 'component';
import { withRouter } from 'react-router-dom';

class Header extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        localStorage.removeItem('devblog');
        this.props.history.push('/');
    }

	render() {
        
        const logged = JSON.parse(localStorage.getItem('devblog')) ? true : false;

		return (
            <HeaderCom logged={logged} handleLogout={this.handleLogout} menu={this.props.menu}/>
		);
	}
}

export default withRouter(Header);