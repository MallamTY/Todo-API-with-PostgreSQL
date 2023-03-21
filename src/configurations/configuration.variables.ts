import dotenv from 'dotenv';
import { PoolConfig } from 'pg';

dotenv.config();

export type configType = string | undefined | number;

export const PORT: configType = process.env.PORT;


//Database connection details

export const DB_PORT: any = process.env.DB_PORT;
export const HOST: any = process.env.HOST;
export const USER: any = process.env.USER;
export const DATABASE: any = process.env.DATABASE;
export const PASSWORD: any = process.env.PASSWORD;
