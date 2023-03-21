import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { StatusCodes } from 'http-status-codes';
import { PORT, configType } from './configurations/configuration.variables';
import dbConnect from './db.connection';
import todoRoutes from './route/todo.route';

const app = express();

app.use(cors());
app.use(express.json())
app.use(morgan('common'));
app.use('/api/v1', todoRoutes);


// app.get('/', (req, res) => {
//     res.send('<h1>Todo Application With PostgreSQL<h1>')
// })




app.get('*', (req, res) => {
    return res.status(StatusCodes.OK).json({
        status: `success`,
        message:`Welcome to the whatever page you clicked`
    });
})
class App {
    private port: configType;

    constructor() {
        this.port =  PORT;
        this.startUp();
        this.home();
        this.errorHander();
    }
 


    private startUp = async() => {
        try {
            const port: configType = PORT || 6000;
            app.listen(port,() => console.log(`\n Todo application running on ${port}...`));
            
            await dbConnect.connect();
            console.log(`\n Database connection established .....`);
                    
         } catch (error: any) {
             console.log(`${error.message} was encountered while trying to connect to the database`);
             process.exit(1)
             
         } 
    }

    private home(): void {
        app.get('*', (req, res) => {
            return res.status(StatusCodes.OK).send(`<h1>Welcome to MallamTY E-Commerce Page</h1>`);
        })
    }

    private errorHander(): void {
        
        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: err.message
            })  
        });
    }
}

export default new App();

