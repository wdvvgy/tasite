import { Tech } from 'model';
import { authErrors } from 'error';

const badRequest = (techInfo) => {
	return !techInfo.email || !techInfo.content || !techInfo.title;
}

/* techId에 해당하는 데이터 조회 */
export const getTech = (techId) => new Promise(async (resolve, reject) => {
	try {
		if(!techId) return reject(authErrors.get('BAD REQUEST'));
		const tech = await Tech.find({ _id: techId });
		resolve(tech);
	} catch(e) {
		reject(e);
	}
});

/* 모든 tech 조회 */
export const getTechs = () => new Promise(async (resolve, reject) => {
	try {
		const tech = await Tech.find();
		resolve(tech);
	} catch(e) {
		reject(e);
	}
});

/* 
	tech 생성
	techInfo: 생성할 tech 정보
*/
export const createTech = (techInfo) => new Promise(async (resolve, reject) => {
	try {
		if(badRequest(techInfo)) return reject(authErrors.get('BAD REQUEST'));
		let tech = new Tech(techInfo);
		await tech.save();
		resolve(tech);
	} catch(e) {
		reject(e);
	}
});

/*
	tech 수정
	techId: 수정할 techId
	techInfo: 수정할 tech 정보
*/
export const editTech = ({techId, techInfo}) => new Promise(async (resolve, reject) => {
	try {
		if(!techId || badRequest(techInfo)) return reject(authErrors.get('BAD REQUEST'));
		const tech = await Tech.update({ _id: techId }, techInfo);
		resolve(tech);
	} catch(e) {
		reject(e);
	}
});

/*
	tech 삭제
	techId: 삭제할 techId
*/
export const deleteTech = (techId) => new Promise(async (resolve, reject) => {
	try {
		if(!techId) return reject(authErrors.get('BAD REQUEST'));
		await Tech.remove({ _id: techId });
		resolve();
	} catch(e) {
		reject(e);
	}
});