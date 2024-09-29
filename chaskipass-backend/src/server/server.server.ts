import express from 'express';
import usersRoute from "../routes/users.routes";
import cors from 'cors';
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
    ClientCooperatives
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
        this.dbConnect();
    }

    listen() {
        this.app.listen(parseInt(this.port), '0.0.0.0', () => {
            console.log('Server running on port ' + this.port);
        })
    }

    routes() {
        const prefixUrl = '/chaski/api'
        this.app.use(`${prefixUrl}/users`, usersRoute);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    /*@dbConnect: Asynchronous function that creates the database based on
    sequelize rules*/
    async dbConnect() {
        try {
            await Promise.all([
                // { alter: true } is used to update the database schema
                Roles.sync(),
                Users.sync({ alter: true }),
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
            ]);
            console.log("Database connected successfully");
        } catch (error) {
            console.log("Unable to connect to the db: " + error);
        }
    }
}