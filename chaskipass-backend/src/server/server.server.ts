// import { UserLoginT } from './../types/index.types';
import express, {Application, Request, Response, NextFunction} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import usersRoute from "../routes/users.routes";
import authRoutes from '../routes/auth.routes';
import administratorsRoutes from '../routes/administrators.routes';
import busesRoutes from '../routes/buses.routes';
import clientsRoutes from '../routes/clients.routes';
import ubicationsRoutes from '../routes/ubications.routes';
import seatsRoutes from '../routes/seats.routes';
import busStructureRoutes from '../routes/busStructure.routes';
import stationCooperativesRoutes from '../routes/stationCooperative.routes';
import serialStationRoutes from '../routes/serialStation.routes';
import typeSeatsRoutes from '../routes/typeSeats.routes';
import paypalRoutes from '../routes/paypal.routes';
import frequenciesRoutes from '../routes/frequencies.routes';
import ticketsRoutes from '../routes/tickets.routes';

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
    ClientCooperatives,
    Admin,
    BusStructure,
    StationCooperative,
    SerialStation,
    SeatStatus
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
        this.app.use(`${prefixUrl}/admins`, administratorsRoutes);
        this.app.use(`${prefixUrl}/auth`, authRoutes);
        this.app.use(`${prefixUrl}/buses`, busesRoutes);
        this.app.use(`${prefixUrl}/clients`, clientsRoutes);
        this.app.use(`${prefixUrl}/seats`, seatsRoutes);
        this.app.use(`${prefixUrl}/ubi`, ubicationsRoutes);
        this.app.use(`${prefixUrl}/users`, usersRoute);
        this.app.use(`${prefixUrl}/busStructure`, busStructureRoutes);
        this.app.use(`${prefixUrl}/linkedStations`, stationCooperativesRoutes);
        this.app.use(`${prefixUrl}/serialNumbers`, serialStationRoutes);
        this.app.use(`${prefixUrl}/typeSeats`, typeSeatsRoutes);
        this.app.use(`${prefixUrl}/paypal`, paypalRoutes);
        this.app.use(`${prefixUrl}/frequency`, frequenciesRoutes);
        this.app.use(`${prefixUrl}/tickets`, ticketsRoutes);
    }

    middlewares() {
        this.app.use(express.json({limit: "50mb"}));//send data in json format, and the middleware parse it to a js object to use in req.body
        this.app.use(cookieParser());//analize the cookies in the request and parse them to a js object (req.cookies)
        this.app.use(cors({
            credentials: true,
            origin: true,
            allowedHeaders: ["Content-Type"],
            methods: ["GET", "POST", "PUT", "DELETE"],  // Agrega aquí los métodos permitidos
            
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
                // { alter: true } is used to update the database schema
                await Admin.sync(),
                await Provinces.sync(),
                await Cities.sync(),
                await Roles.sync(),
                await Cooperatives.sync(),        
                await BusStructure.sync(),
                await PaymentMethods.sync(),      
                await Users.sync(),               
                await Buses.sync(),
                await BusStations.sync(),
                await Routes.sync(),
                await TypeSeats.sync(),
                await Seats.sync(),               
                await StopOvers.sync(),
                await Frequencies.sync(),      
                await SeatStatus.sync(),    
                await SerialStation.sync(),        
                await Clients.sync(),              
                await ClientCooperatives.sync(),   
                await Tickets.sync(),              
                await Payments.sync(),         
                await StationCooperative.sync(),
            console.log("Database connected successfully");
        } catch (error) {
            console.log("Unable to connect to the db: " + error);
        }
    }
}