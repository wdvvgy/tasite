import jwt from 'jsonwebtoken';
require('dotenv').config();
const { JWT_SECRET: jwtSecret } = process.env;

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(401).json({
            success: false,
            auth: false,
            message: 'not logged in'
        });
    }

    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, jwtSecret, (err, decoded) => {
                if(err) reject(err);
                resolve();
            });
        }
    );

    const onError = (error) => {
        res.status(401).json({
            success: false,
            auth: false,
            message: error.message,
            code: 401
        });
    };

    p.then(() => {
        next();
    }).catch(onError);
};

export default authMiddleware;