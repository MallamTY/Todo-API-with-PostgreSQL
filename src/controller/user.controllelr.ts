import { RequestHandler } from 'express';
import dbConnect from '../db.connection';
import validator from 'validator';
import { encrypt } from '../utilities/encryption';
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';



class UserController {
    constructor() {

    }
        /**
         * Signup
         */
        public Signup: RequestHandler = async(req, res) => {
            try {
               
               
                interface reqbody {
                    firstname: string,
                    middlename?: string,
                    lastname: string,
                    email: string
                    password: string,
                    confirm_password: string,
                    username: string
                };
                
                const {body: {firstname, middlename, lastname, username, email, password, confirm_password}} = req; 
                let body: reqbody = {
                    firstname, middlename, lastname, username, 
                    email, password, confirm_password
                }

                if (!body.firstname || !body.lastname ||body.email, 
                    body.username, !body.password || !body.confirm_password) {
                    return res.status(406).json({
                        status: `failed`,
                        message: `All field must be filled`
                    })
                }

                if (!validator.isEmail(body.email)) {
                    return res.status(406).json({
                        status: `failed`,
                        message: `email supplied is not a valid email address`
                    })
                }

                if (body.password !== body.confirm_password) {
                    return res.status(406).json({
                        status: `failed`,
                        message: `password not match`
                    })
                }

                if (!validator.isStrongPassword(body.password) || !validator.isStrongPassword(body.confirm_password)) {
                    return res.status(406).json({
                        status: `failed`,
                        message: `Passwords must contain at least 8 characters, an Uppercase and a special character`
                    })
                }
                const salt = await bcrypt.genSalt(10);
                const hashed = await encrypt(body.password, body.confirm_password);
            
                const {rows}: QueryResult<any> = await dbConnect.query('SELECT * FROM users WHERE username = $1 OR email = $2;', [username, email]);
                if (rows.length !== 0 ) {
                    return res.status(406).json({
                        status: `success`,
                        message: `User with the email or password already exist`
                    })
                }
                else {
                    const {rows}: QueryResult<any> = await dbConnect.query('INSERT INTO users (firstname, middlename, lastname, email, username, password, confirm_password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;', 
                    [firstname, middlename, lastname, email, username, hashed.hashed_password, hashed.hashed_confirmed_password]);

                    if (rows.length !== 0 ) {
                        return res.status(201).json({
                            status: `success`,
                            message: `Account successfully created`
                        })
                    }
                    else {
                        return res.status(404).json({
                            status: `failed`,
                            message: `Unable to created your account this time, please try again later`
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

export default new UserController();
