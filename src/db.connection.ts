import {Pool} from 'pg';
import { DATABASE, DB_PORT, HOST, PASSWORD, USER } from './configurations/configuration.variables';

const dbConnect = (): Pool => {
  
    const credentials = {
        user: USER,
        host: HOST,
        database: DATABASE,
        password: PASSWORD,
        port: DB_PORT
      };
      
       return new Pool(credentials);
}

export default dbConnect();

