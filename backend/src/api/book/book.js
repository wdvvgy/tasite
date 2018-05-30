import { Book } from 'model';
import { authErrors } from 'error';

const badRequest = (bookInfo) => {
	return !bookInfo.email || !bookInfo.date || !bookInfo.name || !bookInfo.url;
}

/* bookId에 해당하는 데이터 조회 */
export const getBook = (bookId) => new Promise(async (resolve, reject) => {
	try {
		if(!bookId) return reject(authErrors.get('BAD REQUEST'));
		const book = await Book.find({ _id: bookId });
		resolve(book);
	} catch(e) {
		reject(e);
	}
});

/* 모든 book 조회 */
export const getBooks = () => new Promise(async (resolve, reject) => {
	try {
		const book = await Book.find();
		resolve(book);
	} catch(e) {
		reject(e);
	}
});

/* 
	book 생성
	bookInfo: 생성할 book 정보
*/
export const createBook = (bookInfo) => new Promise(async (resolve, reject) => {
	try {
		if(badRequest(bookInfo)) return reject(authErrors.get('BAD REQUEST'));
		let book = new Book(bookInfo);
		await book.save();
		resolve(book);
	} catch(e) {
		reject(e);
	}
});

/*
	book 수정
	bookId: 수정할 bookId
	bookInfo: 수정할 book 정보
*/
export const editBook = ({bookId, bookInfo}) => new Promise(async (resolve, reject) => {
	try {
		if(!bookId || badRequest(bookInfo)) return reject(authErrors.get('BAD REQUEST'));
		const book = await Book.update({ _id: bookId }, bookInfo);
		resolve(book);
	} catch(e) {
		reject(e);
	}
});

/*
	book 삭제
	bookId: 삭제할 bookId
*/
export const deleteBook = (bookId) => new Promise(async (resolve, reject) => {
	try {
		if(!bookId) return reject(authErrors.get('BAD REQUEST'));
		await Book.remove({ _id: bookId });
		resolve();
	} catch(e) {
		reject(e);
	}
});