import React from 'react';
import { HeaderCom } from 'component';

const Header = ({ handleLogout, menu, checkStatus }) => (
	<HeaderCom 
		handleLogout={handleLogout}
		menu={menu} 
		checkStatus={checkStatus}
	/>
);

export default Header;