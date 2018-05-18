import auth from './auth';
import book from './book';

import { combineReducers } from 'redux';

export default combineReducers({
    auth, book
});