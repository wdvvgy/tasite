import express from 'express';
import * as auth from './auth';

const api = express.Router();

api.get('/', async (req, res) => {
    console.log('start');
    const result = await auth.func();
    console.log('end');
    
    res.send('HelloWorld');
});

export default api;