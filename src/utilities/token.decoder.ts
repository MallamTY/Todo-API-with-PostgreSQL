import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../configurations/configuration.variables';

export const tokenDecoder = (token: string) => {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken;
}