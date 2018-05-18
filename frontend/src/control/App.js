import React from 'react';
import { hot } from 'react-hot-loader';
import { Main, Auth } from 'control';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => (
	<Router style={{margin:'0'}}>
		<Switch>
			<Route exact path='/auth' component={Auth} />
			<Route path='/' component={Main} />
		</Switch>
	</Router>
)

export default hot(module)(App);
