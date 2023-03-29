import { QueryResult } from 'pg';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcrypt';
import dbConnect from '../db.connection';
import { StatusCodes } from 'http-status-codes';
import { generateAccessToken, generateRefreshToken } from '../utilities/token.generator';
import { REFRESH_TOKEN_SECRET } from '../configurations/configuration.variables';


class AuthController {
    constructor() {

    }
        /**
         * Signup
         */
        public SignIn: RequestHandler = async(req, res) => {
            try {
               
               
                interface reqbody {
                    username?: string,
                    email?: string,
                    password: string,
                
                };
                
                const {body: {username, email, password}} = req; 
                let body: reqbody = {
                    username, email, password
                }

                if (body.email, !body.username, !body.password) {
                    return res.status(406).json({
                        status: `failed`,
                        message: `All field must be filled`
                    })
                }

                if (email) {
                    if (!validator.isEmail(email)) {
                        return res.status(406).json({
                            status: `failed`,
                            message: `email supplied is not a valid email address`
                        })
                    } 
                }
            
                const {rows}: QueryResult<any> = await dbConnect.query('SELECT * FROM users WHERE username = $1 OR email = $2;', [username, email]);
                if ( rows.length === 0) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        status: `failed`,
                        message: `Account doesn't exist`
                    })
                }

                else {
                    const match: boolean = await bcrypt.compare(password, rows[0].password);

                    if (!match) {
                        return res.status(StatusCodes.FORBIDDEN).json({
                            status: `failed`,
                            message: `Username or Password not match`
                        })
                    }

                    else {
                        let access_token = '';
                        let refresh_token = '';
                        if (email) {
                            const a_token = generateAccessToken(rows[0].id, rows[0].role, '', rows[0].email);
                            const r_token = generateRefreshToken(rows[0].id, rows[0].role,'', rows[0].email)
                            access_token = a_token;
                            refresh_token = r_token;
                            
                        }

                        else {
                            const a_token = generateAccessToken(rows[0].id, rows[0].role, rows[0].username);
                            const r_token = generateRefreshToken(rows[0].id, rows[0].role, rows[0].username)
                            access_token = a_token;
                            refresh_token = r_token;
                        }

                        res.cookie('jwt', refresh_token, { httpOnly: true, secure: true, 
                            sameSite: 'none',
                            maxAge: 2 * 60 * 60 * 1000 });
                    
                        return res.status(StatusCodes.OK).json({
                            status: `success`,
                            message: `Login successful`,
                            access_token
                            
                        })
                    }

                }
            
            } catch (error: any) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: `error`,
                    message: error.message
                })
            }
        }

        /**
         * Refresh
         */
        public Refresh: RequestHandler = async(req, res) => {
           try {
            if (req.cookies?.jwt) {
                console.log(req.cookies);
                
                const refreshToken = req.cookies.jwt;
               
                
                if (!refreshToken) {
                    return res.status(StatusCodes.EXPECTATION_FAILED).json({
                        status: `failed`,
                        message: `Error generating refreshed jwt`
                    })
                }

                jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async(err: any, decodedToken: any) => {
                    if (err) {
                        return res.status(StatusCodes.EXPECTATION_FAILED).json({
                            status: `failed`,
                            message: `Error generating refreshed jwt`
                        })
                    }
                        let access_token = '';
                        if (decodedToken.email) {
                            const a_token = generateAccessToken(decodedToken.id, decodedToken.role, decodedToken.email);
                            access_token = a_token;
                        }

                        else {
                            const a_token = generateAccessToken(decodedToken.id, decodedToken.role, decodedToken.username);
                            access_token = a_token;
                        }

                        return res.status(StatusCodes.OK).json({
                            status: `success`,
                            message: `Login successful`,
                            access_token
                            
                        })
                })
            }
           } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: `failed`,
                message: error.message
            })
           }
        }
}

export default new AuthController();
