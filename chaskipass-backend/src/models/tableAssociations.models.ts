import { Buses } from "./buses.models";
import { BusStations } from "./busStations.models";
import { Frequencies } from "./frequencies.models";
import { Cities } from "./cities.models";
import { Clients } from "./clients.models";
import { Cooperatives } from "./cooperatives.models";
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
import BusStructure from "./busStructure.models";
import { SerialStation } from "./serialStation.model";
import { StationCooperative } from "./stationCooperative.models";

Roles.hasMany(Users, {foreignKey: 'role_id', sourceKey: 'id'});
Users.belongsTo(Roles, {foreignKey: 'role_id', targetKey: 'id'});

Routes.hasMany(Frequencies, {foreignKey: 'route_id', sourceKey: 'id'});
Frequencies.belongsTo(Routes, {foreignKey: 'route_id', targetKey: 'id'});
Routes.hasMany(StopOvers, {foreignKey: 'route_id', sourceKey: 'id'});
StopOvers.belongsTo(Routes, {foreignKey: 'route_id', targetKey: 'id'});

Buses.hasMany(Seats, {foreignKey: 'bus_id', sourceKey: 'id'});
Seats.belongsTo(Buses, {foreignKey: 'bus_id', targetKey: 'id'});
Buses.hasMany(Frequencies, {foreignKey: 'bus_id', sourceKey: 'id'});
Frequencies.belongsTo(Buses, {foreignKey: 'bus_id', targetKey: 'id'});

BusStations.hasMany(Routes, {foreignKey: 'departure_station', sourceKey: 'id', as: 'routes_departure_stations'});
Routes.belongsTo(BusStations, {foreignKey: 'departure_station', targetKey: 'id', as:'departure_station_route'});
BusStations.hasMany(Routes, {foreignKey: 'arrival_station', sourceKey: 'id', as: 'routes_arrival_stations'});
Routes.belongsTo(BusStations, {foreignKey: 'arrival_station', targetKey: 'id', as:'arrival_station_route'});
BusStations.hasMany(StopOvers, {foreignKey: 'station_id', sourceKey: 'id'});
StopOvers.belongsTo(BusStations, {foreignKey: 'station_id', targetKey: 'id'});
BusStations.hasMany(Tickets, {foreignKey: 'departure_station', sourceKey: 'id'});
Tickets.belongsTo(BusStations, {foreignKey: 'departure_station', targetKey: 'id'});
BusStations.hasMany(Tickets, {foreignKey: 'arrival_station', sourceKey: 'id'});
Tickets.belongsTo(BusStations, {foreignKey: 'arrival_station', targetKey: 'id'});
BusStations.hasMany(SerialStation, {foreignKey: 'station_id', sourceKey: 'id'});
SerialStation.belongsTo(BusStations, {foreignKey: 'station_id', targetKey: 'id'});
BusStations.hasMany(StationCooperative, {foreignKey: 'station_id', sourceKey: 'id'});
StationCooperative.belongsTo(BusStations, {foreignKey: 'station_id', targetKey: 'id'});

Cooperatives.hasMany(Users, {foreignKey: 'cooperative_id', sourceKey: 'id'});
Users.belongsTo(Cooperatives, {foreignKey: 'cooperative_id', targetKey: 'id'});
Cooperatives.hasMany(Buses, {foreignKey: 'cooperative_id', sourceKey: 'id'});
Buses.belongsTo(Cooperatives, {foreignKey: 'cooperative_id', targetKey: 'id'});
Cooperatives.hasMany(TypeSeats, {foreignKey: 'cooperative_id', sourceKey: 'id'});
TypeSeats.belongsTo(Cooperatives, {foreignKey: 'cooperative_id', targetKey: 'id'});
Cooperatives.hasMany(BusStructure, {foreignKey: 'cooperative_id', sourceKey: 'id'});
BusStructure.belongsTo(Cooperatives, {foreignKey: 'cooperative_id', targetKey: 'id'});
Cooperatives.hasMany(Frequencies, {foreignKey: 'cooperative_id', sourceKey: 'id', as: 'frequencies_cooperatives' });
Frequencies.belongsTo(Cooperatives, {foreignKey: 'cooperative_id', targetKey: 'id', as: 'cooperative_frequency'});
Cooperatives.hasMany(Routes, {foreignKey: 'cooperative_id', sourceKey: 'id', as: 'routes_cooperatives' });
Routes.belongsTo(Cooperatives, {foreignKey: 'cooperative_id', targetKey: 'id', as: 'cooperative_route'});
Cooperatives.hasMany(ClientCooperatives, {foreignKey: 'cooperative_id', sourceKey: 'id'});
ClientCooperatives.belongsTo(Cooperatives, {foreignKey: 'cooperative_id', targetKey: 'id'});
Cooperatives.hasMany(Payments, {foreignKey: 'cooperative_id', sourceKey: 'id'});
Payments.belongsTo(Cooperatives, {foreignKey: 'cooperative_id', targetKey: 'id'});
Cooperatives.hasMany(SerialStation, {foreignKey: 'cooperative_id', sourceKey: 'id'});
SerialStation.belongsTo(Cooperatives, {foreignKey: 'cooperative_id', targetKey: 'id'});

Cities.hasMany(BusStations, {foreignKey: 'city_id', sourceKey: 'id', as:'Bus_stations_city'});
BusStations.belongsTo(Cities, {foreignKey: 'city_id', targetKey: 'id', as:'city_bus_station'});

Clients.hasMany(ClientCooperatives, {foreignKey: 'client_dni', sourceKey: 'dni'});
ClientCooperatives.belongsTo(Clients, {foreignKey: 'client_dni', targetKey: 'dni'});

TypeSeats.hasMany(Seats, {foreignKey: 'type_seat_id', sourceKey: 'id'});
Seats.belongsTo(TypeSeats, {foreignKey: 'type_seat_id', targetKey: 'id'});

Tickets.belongsTo(Seats, {foreignKey: 'seat_id', targetKey: 'id'});
Seats.hasMany(Tickets, {foreignKey: 'seat_id', sourceKey: 'id'});


Tickets.hasMany(Payments, {foreignKey: 'ticket_id', sourceKey: 'id' , as: 'payments_ticket'});
Payments.belongsTo(Tickets, {foreignKey: 'ticket_id', targetKey: 'id', as: 'ticket_payment'});
SerialStation.hasMany(Tickets, {foreignKey: 'serial_station_id', sourceKey: 'id'});
Tickets.belongsTo(SerialStation, {foreignKey: 'serial_station_id', targetKey: 'id'});

Frequencies.hasMany(Tickets, {foreignKey: 'frequency_id', sourceKey: 'id'});
Tickets.belongsTo(Frequencies, {foreignKey: 'frequency_id', targetKey: 'id'});

PaymentMethods.hasMany(Payments, {foreignKey: 'payment_method', sourceKey: 'id'});
Payments.belongsTo(PaymentMethods, {foreignKey: 'payment_method', targetKey: 'id'});

Users.hasMany(SerialStation, {foreignKey: 'user_id', sourceKey: 'dni'});
SerialStation.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'dni'});

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
    ClientCooperatives,
    Admin,
    BusStructure,
    SerialStation,
    StationCooperative
};