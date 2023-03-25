import {Pool} from 'pg';
import { DATABASE_URL } from './configurations/configuration.variables';



const dbConnect = (): Pool => {
  
       return new Pool({
        connectionString: DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
       });
}

export default dbConnect();

