import { Book } from 'model';
import { authErrors } from 'error';

const badRequest = (bookInfo) => {
	return !bookInfo.email || !bookInfo.date || !bookInfo.name || !bookInfo.url;
}

export const getBook = (bookId) => new Promise(async (resolve, reject) => {
	try {
		if(!bookId) {
			return reject(authErrors.get('BAD REQUEST'));
		}
		const book = await Book.find({ _id: bookId });
		resolve(book);
	} catch(e) {
		reject(e);
	}
});

export const getBooks = () => new Promise(async (resolve, reject) => {
	try {
		const book = await Book.find();
		resolve(book);
	} catch(e) {
		reject(e);
	}
});

export const createBook = (bookInfo) => new Promise(async (resolve, reject) => {
	try {
		if(badRequest(bookInfo)) {
			return reject(authErrors.get('BAD REQUEST'));
		}
		let book = new Book(bookInfo);
		await book.save();
		resolve(book);
	} catch(e) {
		reject(e);
	}
});

export const editBook = ({bookId, bookInfo}) => new Promise(async (resolve, reject) => {
	try {
		if(!bookId || badRequest(bookInfo)) {
			return reject(authErrors.get('BAD REQUEST'));
		}
		const book = await Book.update({ _id: bookId }, bookInfo);
		resolve(book);
	} catch(e) {
		reject(e);
	}
});

export const deleteBook = (bookId) => new Promise(async (resolve, reject) => {
	try {
		
		await Book.remove({ _id: bookId });
		resolve();
	} catch(e) {
		reject(e);
	}
});