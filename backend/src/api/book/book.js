import { Book } from 'model';
import { authErrors } from 'error';

export const getBook = () => new Promise(async (resolve, reject) => {
	try {
		const book = await Book.find();
		resolve(book);
	} catch(e) {
		reject(e);
	}
});

export const createBook = (bookInfo) => new Promise(async (resolve, reject) => {
	try {
		if(!bookInfo.email || !bookInfo.date || !bookInfo.name || !bookInfo.url) {
			return reject(authErrors.get('BAD REQUEST'));
		}
		let book = new Book(bookInfo);
		await book.save();
		resolve(book);
	} catch(e) {
		reject(e);
	}
});