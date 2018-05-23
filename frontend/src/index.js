import React from 'react';
import ReactDOM from 'react-dom';
import App from './control/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from 'modules';
import thunk from 'redux-thunk';
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

const render = Component => {
	ReactDOM.render(
		<Provider store={store}>
			<Component />
		</Provider>,
		document.getElementById('root'),
	);
};

render(App);

