import express from 'express';
import jwt from 'jsonwebtoken';
import { Auth } from '../model';
import { transporter, fromUri } from '../config/mailer';
import { jwt_option } from '../config/jwt';
import { auth_errors } from './error/error';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.post('/register', (req, res) => {
    
    const { email, pw } = req.body.auth;
    const secret = req.app.get('jwt-secret');

    /* Validation check */
    const badInputCheck = () => new Promise((resolve, reject) => {
        if(typeof email !== 'string' || typeof pw !== 'string') reject('BAD REQUEST');
        if(email === '' || pw === '') reject('BAD REQUEST');
        resolve();
    });
    
    /* Already Join check */
    const existCheck = () => new Promise((resolve, reject) => {
        Auth.findOne({email: email}, (err, exists) => {
            if (err) reject({ key:'EXCEPTION', message: err });
            else if (exists) {
                if(exists.authorized) reject('ALREADY JOINED');
                else resolve(false);
            }
            else resolve(true);
        });
    });

    /*
        authorized 가 true -> 가입신청 가능
        authorized 가 false -> 가입신청중
        Auth model 생성 후 token 발급
    */
    const makeAuth = (authorized) => new Promise((resolve, reject) => {
        if(!authorized) reject('PROCEEDING');

        let auth = new Auth({email: email, pw: pw});
        auth.pw = auth.generateHash(pw);
        jwt.sign({ email }, secret, jwt_option, (err, token) => {
            if(err) reject({ key:'EXCEPTION', message: err });
            auth.token = token;
            resolve(auth);
        });
    });

    /* Auth model를 DB에 save */
    const saveAuth = (auth) => new Promise((resolve, reject) => {  
        auth.save(err => {
            if(err) reject({ key:'EXCEPTION', message: err });
            resolve(auth);
        });
    });

    /* 인증 mail 전송 */
    const sendMail = (auth) => new Promise((resolve, reject) => {
        const mailOptions = {
            from: fromUri,
            to: auth.email,
            subject: 'DevBlog 인증',
            html: `
            <p> 아래 링크를 눌러주세요.</p>
            <a href="http://localhost:3000/api/auth/token/${auth.token}">인증하기</a>
            `
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) reject({ key:'EXCEPTION', message: err });
            resolve();
        });
    });

    const response = (token) => { res.json({ message: 'success' }); };

    const onError = (error) => {
        console.log(error);
        if(error.key === 'EXCEPTION') res.status(500).json({ key: error.key, message: auth_errors.get(error.key) });
        else {
            error = { key: error, message: auth_errors.get(error) };
            res.status(409).json(error);
        }
    };

    badInputCheck().then(existCheck).then(makeAuth).then(saveAuth).then(sendMail).then(response).catch(onError);

});

router.post('/login', (req, res) => {

    const { email, pw } = req.body.auth;

    const badInputCheck = () => new Promise((resolve, reject) => {
        if(typeof email !== 'string' || typeof pw !== 'string') reject('BAD REQUEST');
        resolve();
    });

    const existCheck = () => new Promise((resolve, reject) => {
        Auth.findOne({ email: email }, (err, auth) => {
            if(err) reject('NO EXIST INFO');
            if(!auth) reject('NO EXIST INFO');
            resolve(auth);
        });  
    });

    const matchAuth = (auth) => new Promise((resolve, reject) => {
        if(!auth.validateHash(pw)) reject('NO EXIST INFO');
        resolve(auth);
    });

    const isAuthorized = (auth) => new Promise((resolve, reject) => {
        if(!auth.authorized) reject('PROCEEDING');
        resolve(auth);
    });

    const createToken = (auth) => new Promise((resolve, reject) => {
        jwt.sign({
            id: auth.id
        }, req.app.get('jwt-secret'), {
            expiresIn: '1d',
            issuer: 'TATeam',
            subject: 'userInfo'
        }, (err, token) => {
            if(err) reject(err);
            console.log(token);
            resolve({
                token: token,
                id: auth.id
            });
        });
    });

    const response = (auth) => { res.json({ message: 'success', token: auth.token }); };

    const onError = (error) => {
        console.log(error);
        if(error.key === 'EXCEPTION') res.status(500).json({ key: error.key, message: auth_errors.get(error.key) });
        else {
            error = { key: error, message: auth_errors.get(error) };
            res.status(409).json(error);
        }
    };

    badInputCheck().then(existCheck).then(matchAuth).then(isAuthorized).then(createToken).then(response).catch(onError);
});

/* email 인증 */
router.get('/token/:param', (req, res) => {
    const token = req.params.param;

    const validToken = () => new Promise((resolve, reject) => {
        Auth.findOne({ token: token }, (err, auth) => {
            if(err) reject('NO EXIST INFO');
            auth.authorized = true;
            auth.save(err => {
                if(err) reject({ key:'EXCEPTION', message: err });
                resolve();
            });
        });
    });

    const response = () => { res.send('<p>Good!</p> <a href="http://localhost:3001/auth">로그인하러가기</a>') };
    
    const onError = (error) => {
        console.log(error);
        if(error.key === 'EXCEPTION') res.status(500).json({ key: error.key, message: auth_errors.get(error.key) });
        else {
            error = { key: error, message: auth_errors.get(error) };
            res.status(409).json(error);
        }
    };

    validToken().then(response).catch(onError);

});

router.post('/check', (req, res) => {
    const token = req.headers['x-access-token'];
    const secret = req.app.get('jwt-secret');
    
    if(!token) return res.status(401).json(auth_errors.get('UNAUTHORIZED'));
    
    const checkToken = () => new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if(err) reject(err);
            resolve(decoded);
        });
    });

    const response = (decodedToken) => {
        res.json({ message: 'success' });
    };

    const onError = (error) => {
        console.log(error);
        if(error.key === 'EXCEPTION') res.status(500).json({ key: error.key, message: auth_errors.get(error.key) });
        else {
            error = { key: error, message: auth_errors.get(error) };
            res.status(409).json(error);
        }
    };

    checkToken().then(response).catch(onError);
});



router.use('/', authMiddleware);
router.get('/', (req, res) => {
    const findAuth = () => new Promise((resolve, reject) => {
        Auth.find({ authorized: true}, (err, exists) => {
            if(err) reject({ key: 'EXCEPTION', message: '오류가 발생했습니다.' });
            resolve(exists);
        });
    });

    const response = (auth) => {
        res.json(auth);
    }

    const onError = (error) => {
        res.status(500).json(error);
    };

    findAuth().then(response).catch(onError);
});

export default router;