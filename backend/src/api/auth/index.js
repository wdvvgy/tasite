import express from 'express';
import * as auth from './auth';

const api = express.Router();

api.get('/', async (req, res) => {
<<<<<<< HEAD
    console.log('start');
    const result = await auth.func();
    console.log('end');
    
    res.send('HelloWorld');
=======
	const result = await auth.func();
	console.log('result', result);
	res.send('HelloWorld');
>>>>>>> 5e5582cb122af90b795fd4354aa4fa23b094ed1a
});

export default api;