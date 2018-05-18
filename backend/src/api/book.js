import express from 'express';
import { Book } from '../model';
const router = express.Router();

router.get('/', (req, res) => {
    const findBook = () => new Promise((resolve, reject) => {
        Book.find({ }, (err, exists) => {
            if (err) reject({ key: 'EXCEPTION', message: '오류가 발생했습니다.' });
            resolve(exists);
        });
    });

    const response = (book) => {
        res.json(book);
    }

    const onError = (error) => {
        res.status(500).json(error);
    };

    findBook().then(response).catch(onError);
});

router.post('/', (req, res) => {
    const newBook = req.body.book;
    
    const createBook = (newBook) => new Promise((resolve, reject) => {
        let book = new Book({
            email: newBook.email,
            date: newBook.date,
            name: newBook.name,
            url: newBook.url
        });
        book.save((err) => {
            if(err) reject({ key: 'EXCEPTION', message: err });
            resolve();
        });
    });

    const response = () => {
        res.json({ message: 'success' });
    }

    const onError = (error) => {
        res.status(500).json(error);
    };

    createBook(newBook).then(response).catch(onError);

});

export default router;