import express from 'express';
import * as auth from './auth';
import { authErrors } from 'error';
import { Auth } from 'model';
import authMiddleware from 'middleware/auth';

const api = express.Router();

api.get('/', async (req, res) => {
    console.log('start');
    const result = await auth.func();
    console.log('end');
    res.send('HelloWorld');
});

/*
    email, pw를 받고 일치하는지 확인한 후
    client에게 token을 발급한다.
    response : token
*/
api.post('/login', async (req, res) => {
    try {
        const { email, pw } = req.body.auth;
        await auth.checkPw({ email, pw });
        const token = await auth.createToken(email);
        res.status(200).json({ token: token });
    } catch(e) {
        console.error(e.message);
        if(e.status){
            res.status(e.status).json(e);
        } else {
            const error = authErrors.get('EXCEPTION');
            res.status(error.status).json({ message: error.message });
        }
    }
})

/*
    email, pw를 받고 존재하는지 체크한 후
    db에 save를 하고
    인증메일을 발송한다.
    response: just message
*/
api.post('/register', async (req, res) => {
    try {
        const { email, pw } = req.body.auth;
        const token = await auth.save({ email, pw });
        await auth.sendMail({ email, token });
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

/*
    회원가입 프로세스중 하나인 이메일 인증.
    response: 로그인 Link
*/
api.get('/token/:token', async (req, res) => {
    try {
        const { token } = req.params;
        if(!token) reject(authErrors.get('EXCEPTION'));

        let auth = await Auth.findById({ _id: token });
        if(!auth) reject(authErrors.get('NO EXIST INFO'));

        auth.authorized = true;
        await auth.save();

        res.status(200).send(<a href='http://localhost:3000/auth'>로그인 하러가기</a>);
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

/*
    인증된 사용자인지 체크
*/
api.use('/check', authMiddleware);
api.post('/check', async (req, res) => {
    res.status(200).json({ message: 'success' });
});

export default api;