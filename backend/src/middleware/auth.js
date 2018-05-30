import jwt from 'jsonwebtoken';
import { authErrors } from 'error';
require('dotenv').config();
const { JWT_SECRET: jwtSecret } = process.env;

const authMiddleware = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token) {
        const error = authErrors.get('BAD REQUEST');
        res.status(error.status).json({ message: error.message });
    }
    try {
        const p = await jwt.verify(token, jwtSecret);
        next();
    } catch(e) {
        if(e.status){
            res.status(e.status).json(e);
        } else {
            const error = authErrors.get('UNAUTHORIZED');
            res.status(error.status).json({ message: error.message });
        }
    }        

};

export default authMiddleware;