import express from 'express';
import * as auth from './auth';

const api = express.Router();

api.get('/', async (req, res) => {
    const result = await auth.func();
    console.log('result', result);
    res.send('HelloWorld');
});

export default api;