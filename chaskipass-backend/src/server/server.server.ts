import express from 'express';
import usersRoute from "../routes/users.routes";
import cors from 'cors';
import { Role } from '../models/roles.models';
import connectionDb from '../db/connection.db';

export default class Server {
    private app: express.Application;
    private port:string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(parseInt(this.port), '0.0.0.0', ()=>{
            console.log('Server running on port ' + this.port);
        })
    }

    routes(){
        const prefixUrl='/chaski/api'
        this.app.use(`${prefixUrl}/users`, usersRoute);
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    /*@dbConnect: Asynchronous function that creates the database based on
    sequelize rules*/
    async dbConnect(){
        try{
            await Role.sync();
        }catch(error){
            console.log("Unable to connect to the db: "+error);
        }
    }
}