import { Buses } from "./buses.models";
import { BusStations } from "./busStations.models";
import { Frequencies } from "./frequencies.models";
import { Cities } from "./cities.models";
import { Clients } from "./clients.models";
import { Cooperatives } from "./cooperatives.models";
import { NotificationMails } from "./notificationMails.models";
import { PaymentMethods } from "./paymentMethods.models";
import { Payments } from "./payments.models";
import { Provinces } from "./provinces.models";
import { Roles } from "./roles.models";
import { Routes } from "./routes.models";
import { Seats } from "./seats.models";
import { StopOvers } from "./stopOvers.models";
import { Tickets } from "./tickets.models";
import { TypeSeats } from "./typeSeats.models";
import { Users } from "./users.models";
import { ClientCooperatives } from "./clientCooperatives";
import { Admin } from "./administrators.models";

Roles.hasMany(Users, {foreignKey: 'role_id', sourceKey: 'id'});
Cooperatives.hasMany(Users, {foreignKey: 'cooperative_id', sourceKey: 'id'});
Cooperatives.hasMany(Buses, {foreignKey: 'cooperative_id', sourceKey: 'id'}); 
Cooperatives.hasMany(TypeSeats,{foreignKey: 'cooperative_id', sourceKey: 'id'});
TypeSeats.hasMany(Seats, {foreignKey: 'type_id', sourceKey: 'id'});
Buses.hasMany(Seats, {foreignKey: 'bus_id', sourceKey: 'id'});
Buses.hasMany(Frequencies, {foreignKey: 'bus_id', sourceKey: 'id'});
Frequencies.hasMany(Tickets,{foreignKey: 'frequency_id', sourceKey: 'id'});
Tickets.belongsTo(Seats, {foreignKey: 'seat_id', targetKey: 'id'});
Cooperatives.hasMany(Frequencies, {foreignKey: 'cooperative_id', sourceKey: 'id'});
Routes.hasMany(Frequencies, {foreignKey: 'route_id', sourceKey: 'id'});
Cooperatives.hasMany(Routes, {foreignKey: 'cooperative_id', sourceKey: 'id'});
BusStations.hasMany(Routes, {foreignKey: 'departure_station', sourceKey: 'id'});
BusStations.hasMany(Routes, {foreignKey: 'arrival_station', sourceKey: 'id'});
BusStations.hasMany(StopOvers, {foreignKey: 'station_id', sourceKey: 'id'});
BusStations.hasMany(Tickets, {foreignKey: 'departure_station', sourceKey: 'id'});
BusStations.hasMany(Tickets, {foreignKey: 'arrival_station', sourceKey: 'id'});
Routes.hasMany(StopOvers, {foreignKey: 'route_id', sourceKey: 'id'});
Provinces.hasMany(Cities, {foreignKey: 'province_id', sourceKey: 'id'});
Cities.hasMany(BusStations, {foreignKey: 'city_id', sourceKey: 'id'});
Clients.hasMany(Tickets, {foreignKey: 'client_dni', sourceKey: 'dni'});
Clients.hasMany(ClientCooperatives, {foreignKey: 'client_dni', sourceKey: 'dni'});
Cooperatives.hasMany(ClientCooperatives, {foreignKey: 'cooperative_id', sourceKey: 'id'});
Tickets.hasMany(Payments, {foreignKey: 'ticket_id', sourceKey: 'id'});
PaymentMethods.hasMany(Payments, {foreignKey: 'payment_method', sourceKey: 'id'});

export{
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
};