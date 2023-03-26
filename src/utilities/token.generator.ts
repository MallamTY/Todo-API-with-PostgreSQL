import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../configurations/configuration.variables';



export const generateToken = (id: string, role: string, username?: string, email?: string) => {
    let token: string = ''
    if (email) {
        token = jwt.sign({id, email, role}, JWT_SECRET);
    }
    else {
        token = jwt.sign({id, username, role}, JWT_SECRET)
    }
    return token;
}


