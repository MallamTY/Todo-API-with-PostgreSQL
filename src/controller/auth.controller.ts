import { QueryResult } from 'pg';
import { RequestHandler } from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { encrypt } from '../utilities/encryption';
import dbConnect from '../db.connection';
import { StatusCodes } from 'http-status-codes';
import { generateToken } from '../utilities/token.generator';


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
                        let token = '';
                        if (email) {
                            token = generateToken(rows[0].id, rows[0].role, rows[0].email);
                        }

                        else {
                            token = generateToken(rows[0].id, rows[0].role, rows[0].username)
                        }
                        return res.status(StatusCodes.OK).json({
                            status: `success`,
                            message: `Login successful`,
                            token
                        })
                    }
                }

            
            } catch (error: any) {
                return res.status(500).json({
                    status: `error`,
                    message: error.message
                })
            }
        }
}

export default new AuthController();
