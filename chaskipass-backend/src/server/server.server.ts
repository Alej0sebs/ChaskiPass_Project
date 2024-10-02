import express, {Application, Request, Response, NextFunction} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import usersRoute from "../routes/users.routes";
import authRoutes from '../routes/auth.routes';
import administrators from '../routes/administrators.routes';

import {
    Roles,
    Users,
    Cooperatives,
    Buses,
    TypeSeats,
    Seats,
    Frequencies,
    Tickets,
    Routes,
    StopOvers,
    BusStations,
    Provinces,
    Cities,
    Clients,
    PaymentMethods,
    Payments,
    NotificationMails,
    ClientCooperatives,
    Admin
} from '../models/tableAssociations.models';

export default class Server {
    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
    }
    
    listen() {
        this.app.listen(parseInt(this.port), '0.0.0.0', () => {
            this.dbConnect();
            console.log('Server running on port ' + this.port);
        })
    }

    routes() {
        const prefixUrl = '/chaski/api'
        this.app.use(`${prefixUrl}/auth`, authRoutes);
        this.app.use(`${prefixUrl}/users`, usersRoute);
        this.app.use(`${prefixUrl}/admins`, administrators);
        
    }

    middlewares() {
        this.app.use(express.json());//send data in json format, and the middleware parse it to a js object to use in req.body
        this.app.use(cookieParser());//analize the cookies in the request and parse them to a js object (req.cookies)
        this.app.use(cors({
            credentials: true,
            origin: true,
            allowedHeaders: ["Content-Type"],
        }));
        this.app.disable('x-powered-by');
        this.app.use(this.securityHeaders);
    }

    securityHeaders(req: Request, res: Response, next: NextFunction) {
        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.example.com; frame-src 'none'; object-src 'none'");
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("X-XSS-Protection", "1; mode=block");
        res.setHeader("Referrer-Policy", "no-referrer");
        res.setHeader("Permissions-Policy", "geolocation=(self), microphone=()");
        next();
    }

    /*@dbConnect: Asynchronous function that creates the database based on
    sequelize rules*/
    async dbConnect() {
        try {
            await Promise.all([
                // { alter: true } is used to update the database schema
                Roles.sync(),
                Users.sync(),
                Cooperatives.sync(),
                Buses.sync(),
                TypeSeats.sync(),
                Seats.sync(),
                Frequencies.sync(),
                Tickets.sync(),
                Routes.sync(),
                StopOvers.sync(),
                BusStations.sync(),
                Provinces.sync(),
                Cities.sync(),
                Clients.sync(),
                PaymentMethods.sync(),
                Payments.sync(),
                NotificationMails.sync(),
                ClientCooperatives.sync(),
                Admin.sync()
            ]);
            console.log("Database connected successfully");
        } catch (error) {
            console.log("Unable to connect to the db: " + error);
        }
    }
}