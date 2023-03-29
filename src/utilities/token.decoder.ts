import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../configurations/configuration.variables';

export const accessTokenDecoder = (token: string) => {
    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET );
    return decodedToken;
}
