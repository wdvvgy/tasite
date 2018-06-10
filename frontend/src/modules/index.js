import auth from './auth';
import book from './book';
import tech from './tech';

import { combineReducers } from 'redux';

export default combineReducers({
	auth, book, tech
});