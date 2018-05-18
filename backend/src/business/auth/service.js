import { Auth } from 'model';
import jwt from 'jsonwebtoken';
import { transporter } from 'config';
require('dotenv').config();

const { JWT_SECRET: jwtSecret, SMTP_FROM: from } = process.env;

const mailOption = (email, token) => {
    return {
        from: from,
        to: email,
        subject: 'DevBlog 인증',
        html: `
            <p> 아래 링크를 눌러주세요.</p>
            <a href="http://localhost:3000/api/auth/token/${token}">인증하기</a>
            `
    };
};

const error = (res, msg) => {
    res.status(409).json(msg);
};

const response = (res) => {
    res.status(200);
};

export const existCheck = async (email) => {
    const exist = await Auth.findOne({ email });
    console.log('exist', exist);
    if(!exist) return false;
    return true;
};

export const saveAuth = async (req, res) => {
    const { email, pw } = req.body;

    let auth = new Auth({ email, pw });
    auth.pw = auth.generateHash(pw);

    const token = await jwt.sign({ email }, jwtSecret);
    auth.token = token;

    await auth.save();

    response();
};

export const sendMail = async (req, res) => {
    const { email, token } = req.body;

    const mailOpt = mailOption(email, token);
    await transporter.sendMail(mailOpt);

    response();
};