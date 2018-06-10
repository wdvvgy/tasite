import express from 'express';
import auth from './auth';
import book from './book';
import tech from './tech';

const api = express.Router();

api.use('/auth', auth);
api.use('/book', book);
api.use('/tech', tech);

export default api;