import express from 'express';
import auth from './auth';
import book from './book';

const api = express.Router();

api.use('/auth', auth);
api.use('/book', book);

export default api;