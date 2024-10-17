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

export type ClientsT = InferAttributes<Clients>;

export type BusT = InferAttributes<Buses>;
export type RolesT = InferAttributes<Roles>;

export type CooperativesT = InferAttributes<Cooperatives>;

export type FrequencyT= Omit<InferAttributes<Frequencies>, 'trip_type'> ;

export type RoutesT = InferAttributes<Routes> & {
    stopOverList?: string[],
    dni: string
};

export type DataPaginationT = {
    page: number,
    limit: number,
    pattern?: string
}

export type TicketInformationT=InferAttributes<Tickets> & {
}

export type BusStructureT=InferAttributes<BusStructure>

export type BusStationT=InferAttributes<BusStations>

export type SeatT=InferAttributes<Seats>;

export type SeatCreateT=Pick<SeatT, 'bus_id' | 'number_seat' | 'type_seat_id'>;

export type StationCooperativeT = InferAttributes<StationCooperative>

export type NewStationT= InferAttributes<BusStations>;
