import { InferAttributes } from "sequelize";
import { Users } from "../models/users.models";

// export type UserT=InferAttributes<Users>
// export type UserLoginT=Pick<UserT, 'user_name' | 'email' | 'password' | 'dni' | 'cooperative_id'>

export type validateRoleAndRouteId={
    dni:string,
    cooperative_id:string,
    departure_station_id:string,
    arrival_station_id:string
}