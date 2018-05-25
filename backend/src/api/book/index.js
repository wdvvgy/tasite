import express from 'express';
import * as book from './book';
import { authErrors } from 'error';
import authMiddleware from 'middleware/auth';

const api = express.Router();

/*
    인증된 사용자인지 체크
*/
api.use('/', authMiddleware);

/*
    모든 book을 가져온다.
    response: book (array)
*/
api.get('/', async (req, res) => {
	try {
        const books = await book.getBook();
        res.status(200).json({ book: books });
    } catch(e) {
        console.error(e.message);
        if(e.status){
            res.status(e.status).json(e);
        } else {
            const error = authErrors.get('EXCEPTION');
            res.status(error.status).json({ message: error.message });
        }
    }    
});

api.post('/', async (req, res) => {
	try {
		const bookInfo = req.body.book;
		await book.createBook(bookInfo);
		res.status(200).json({ message: 'success' });
	} catch(e) {
		console.error(e.message);
        if(e.status){
            res.status(e.status).json(e);
        } else {
            const error = authErrors.get('EXCEPTION');
            res.status(error.status).json({ message: error.message });
        }
	}
});

export default api;