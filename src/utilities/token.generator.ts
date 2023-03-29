import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../configurations/configuration.variables';



export const generateAccessToken = (id: string, role: string, username?: string, email?: string): string => {
    let token: string = ''
    if (email) {
        token = jwt.sign({id, email, role}, ACCESS_TOKEN_SECRET, {expiresIn: '5m'});
    }
    else {
        token = jwt.sign({id, username, role}, ACCESS_TOKEN_SECRET)
    }
    return token;
}


export const generateRefreshToken = (id: string, role: string, username?: string, email?: string): string => {
    let token: string = ''
    if (email) {
        token = jwt.sign({id, role, email}, REFRESH_TOKEN_SECRET, {expiresIn: '2h'});
    }
    else {
        token = jwt.sign({id, username, role}, REFRESH_TOKEN_SECRET)
    }
    return token;
}


