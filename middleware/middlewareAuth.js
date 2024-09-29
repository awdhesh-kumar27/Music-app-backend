    import jwt from 'jsonwebtoken';
    // import { Settoken,Gettoken } from './auth.js';
    import { Settoken,Gettoken} from '../controller/auth.js';

    export const Authorization = (req,res,next)=>{
        // console.log(req);
        // console.log('Request URL:', req.url);
        const authHeader = req.headers['authorization'];
        // console.log(req.body);
        if (!authHeader) {
            return res.status(403).send({ message: 'No authorization header provided!' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(403).send({ message: 'No token provided!' });

        const decodedToken = Gettoken(token);

            if (decodedToken) {
                // console.log('Token is valid:', decodedToken);
                req.userId = decodedToken.user;
                // console.log("token",req.userId);
                // console.log(next);
                
                next();
            } else {
                console.log('Token is invalid or expired');
                return res.status(500).send({ message: 'Failed to authenticate token.' });
            }

    }