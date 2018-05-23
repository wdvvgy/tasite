import { Auth } from 'model';
import { authErrors } from 'error';
import jwt from 'jsonwebtoken';
import { transporter } from 'config';
require('dotenv').config();
const { JWT_SECRET: jwtSecret, SMTP_FROM: from, PORT: port } = process.env;

const mailOption = ({ email, token }) => {
    return {
        from: from,
        to: email,
        subject: 'TA 사이트 가입 인증 메일',
		html:
			`
				<p> 아래 링크를 눌러주세요.</p>
				<a href="http://localhost:${port}/api/auth/token/${token}">인증하기</a>
            `
    };
};

export const func = (x) => new Promise(resolve => {
    setTimeout(() => {
        console.log('in setTimeout');
        resolve(x);
    }, 2000);
});

/* 
	email 존재여부 확인
	in: email(string)
	out: auth(object)	
*/
export const checkExist = (email) => new Promise(async (resolve, reject) => {
    if(!email) reject(authErrors.get('BAD REQUEST'));

    const exist = await Auth.findOne({ email });
    if(!exist) reject(authErrors.get('NO EXIST INFO'));

    resolve(exist);
});

/* 
	email과 pw가 일치하는 계정이 존재하는지 확인
	in: email(string), pw(string)
	out: void
*/
export const checkPw = ({ email, pw }) => new Promise(async (resolve, reject) => {
    try {
        if(!email || !pw) return reject(authErrors.get('BAD REQUEST'));

        /* PW Check */
        const auth = await checkExist(email);
        if(!auth.validateHash(pw)) return reject(authErrors.get('NO EXIST INFO'));

        /* Authorized Check */
        if(!auth.authorized) return reject(authErrors.get('PROCEEDING'));

        resolve();
    } catch(e) {
        reject(e);
    }
    
});

/* 
	token 발급 
	in: email(string)
	out: token(string)
*/
export const createToken = (email) => new Promise(async (resolve, reject) => {
    try {
        jwt.sign({ id: email }, jwtSecret, {
            expiresIn: '1d',
            issuer: 'TATeam',
            subject: 'auth'
        }, (err, token) => {
            if(err) {
                console.error(err);
                return reject(authErrors.get('EXCEPTION'));
            }
            resolve(token);
        });
    } catch(e) {
        reject(e);
    }
});

/* 
	회원가입 
	in: email(string), pw(string)
	out: void
*/
export const save = ({ email, pw }) => new Promise(async (resolve, reject) => {
    try {
        if(!email || !pw) return reject(authErrors.get('BAD REQUEST'));
        
		let auth = await Auth.findOne({ email });
		if(auth) return reject(authErrors.get(auth.authorized ? 'ALREADY JOINED' : 'PROCEEDING'));
		
		auth = new Auth({ email, pw });
        auth.pw = auth.generateHash(pw);
		await auth.save();
		resolve(auth._id);
    } catch(e) {
        reject(e);
    }
    
});

/*
	SMTP 인증메일 발송 
	in: email(string), token(string)
	out: void
*/
export const sendMail = ({ email, token }) => new Promise(async (resolve, reject) => {
	try {
		const mailOpt = mailOption({ email, token });
		await transporter.sendMail(mailOpt);
		resolve();
	} catch(e) {
        console.log('e', e);
		reject(e);
	}
});