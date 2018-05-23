import jwt from 'jsonwebtoken';
require('dotenv').config();
const { JWT_SECRET: jwtSecret } = process.env;

const authMiddleware = (req, res, next) => {
    // read the token from header or url
    const token = req.headers['x-access-token'];
    
    // token does not exist
    if(!token) {
        // 401 Unauthorized
        return res.status(401).json({
            success: false,
            auth: false,
            message: 'not logged in'
        });
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, jwtSecret, (err, decoded) => {
                if(err) reject(err);
                resolve();
            });
        }
    );

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        // 401 Unauthorized
        res.status(401).json({
            success: false,
            auth: false,
            message: error.message,
            code: 401
        });
    };

    // process the promise
    p.then(() => {
        next();
    }).catch(onError);
};

export default authMiddleware;