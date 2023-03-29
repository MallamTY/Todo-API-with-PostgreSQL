import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

dotenv.config();

export type configType = string | undefined | number;

export const PORT: configType = process.env.PORT;


//Database connection detail
export const DATABASE_URL: string = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`;

//JWT key
export const ACCESS_TOKEN_SECRET: Secret | string = process.env.ACCESS_TOKEN_SECRET || '';
export const REFRESH_TOKEN_SECRET: Secret | string = process.env.REFRESH_TOKEN_SECRET || '';


