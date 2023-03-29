import { RequestHandler } from "express";
import {JwtPayload} from "jsonwebtoken";
import { accessTokenDecoder } from "../utilities/token.decoder";
import { StatusCodes } from "http-status-codes";

const Authentication: RequestHandler = (req, res, next) => {
    try {
        interface tokenType {
            id: string;
            email: string;
            username: string

        }

        interface payload {
            id: string,
            username?: string,
            email?: string
        }

        type tokenT = string | JwtPayload | tokenType
        let {authorization} = req.headers
        if (!authorization) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: `Failed !!!!!`,
                message: `Authorization failed`
            })
        }
        const token = authorization.split(' ')[1];
        
        if (!token) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: `Failed !!!!!`,
                message: `Authorization failed`
            })
        }

        const payload: any= accessTokenDecoder(token);
        req.user = ({...payload});
        next();
        
    } catch (error: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: `failed`,
            message: error.message
    })
    }
}

export default Authentication;