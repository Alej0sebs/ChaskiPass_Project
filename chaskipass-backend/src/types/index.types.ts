import { InferAttributes } from "sequelize";
import { Users } from "../models/users.models";
import Clients from "../models/clients.models";
import Buses from "../models/buses.models";
import Routes from "../models/routes.models";
import { Admin } from "../models/administrators.models";
import Cooperatives from "../models/cooperatives.models";
import Roles from "../models/roles.models";
import Tickets from "../models/tickets.models";
import Frequencies from "../models/frequencies.models";
import BusStructure from "../models/busStructure.models";
import BusStations from "../models/busStations.models";
import Seats from "../models/seats.models";
import { StationCooperative } from "../models/stationCooperative.models";
import { SerialStation } from "../models/serialStation.model";
import TypeSeats from "../models/typeSeats.models";

// export type UserT=InferAttributes<Users>
// export type UserLoginT=Pick<UserT, 'user_name' | 'email' | 'password' | 'dni' | 'cooperative_id'>

export type ValidateRoleAndRouteId = {
    dni: string,
    cooperative_id: string,
    departure_station_id: number,
    arrival_station_id: number
}
export type SaasAdmin = InferAttributes<Admin>;

export type UserLoginT = Pick<Users, 'user_name' | 'email' | 'password'>;

export type UserT = InferAttributes<Users>;

export type UpdateUserT = Pick<Users, 'dni' | 'name' | 'last_name' | 'user_name' | 'phone' | 'address' | 'password'>;

export type ClientsT = InferAttributes<Clients>;

export type BusT = InferAttributes<Buses>;
export type DeleteBusT = Pick<BusT, 'id' | 'license_plate'| 'cooperative_id'>;

export type RolesT = InferAttributes<Roles>;

export type CooperativesT = InferAttributes<Cooperatives>;

export type FrequencyModelT = InferAttributes<Frequencies>;
export type FrequencyT = Omit<InferAttributes<Frequencies>, 'trip_type'| 'id'>;
export type EditFrequencyT = Partial<Pick<Frequencies, 'id' | 'bus_id' | 'driver_id' | 'date' | 'departure_time' | 'arrival_time' | 'price' | 'status'>>;

export type RoutesT = InferAttributes<Routes> & {
    stopOverList?: string[],
    dni: string
};

export type DataPaginationT = {
    page: number,
    limit: number,
    pattern?: string
};

export type BusStructureT = InferAttributes<BusStructure>;

export type BusStationT = InferAttributes<BusStations>;

export type SeatT = InferAttributes<Seats>;

export type SeatBusT = Pick<BusT, 'license_plate'> &{
    layout: string
};

export type StationCooperativeT = InferAttributes<StationCooperative>;

export type NewStationT = InferAttributes<BusStations>;

export type SerialNumberT = InferAttributes<SerialStation>;

export type TypeSeatT = InferAttributes<TypeSeats>;
export type CreateTypeSeatT = Omit<TypeSeatT, 'id'>;

export type FilterFrequenciesT = Omit<FrequencyModelT, 'id' | 'status' | 'bus_id' | 'route_id' | 'driver_id'> &{
    departure_city: string,
    arrival_city: string
};

export type SeatsStructureT = {
    cooperative_id: string,
    frequency_id: string,
    bus_id: number,
    bus_structure_id: number
}

type ClientSeatT = {
    dni:string,
    name:string,
    last_name:string,
    exist:boolean
};

type PurchasedSeatT={
    seatId:string,
    additionalCost:number,
    client:ClientSeatT,
    priceDestination:number
}

export type TicketClientInformationT = {
    id: number;
    serial_number: number;
    frequency_id: string;
    price: number;
    departure_station: number;
    arrival_station: number;
    date: Date;
    selectedSeats: PurchasedSeatT[];
    cooperative_id: string;
    payment_method: string;
    serial_id: number;
}

export type ClientCooperativeT={
    dni:string,
    cooperative_id:string
}

export type PaymentT = {
    payment_method: string,
    amount: number,
    cooperative_id: string,
    ticket_id: number,
}