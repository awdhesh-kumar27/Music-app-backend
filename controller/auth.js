import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// dotenv.config();
dotenv.config();

const secret =  process.env.JWT_KEY; 
export const Settoken = (user) =>{
    // console.log(process.env.JWT_KEY);
    try {
        return jwt.sign({user}, secret, { expiresIn: 86400 }); // Expires in 24 hours
    } catch (err) {
        console.error('Error creating token:', err);
        return null;
    }
}

export const Gettoken= (token) =>{
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        console.error('Invalid token', err);
        return null;
    }
}
