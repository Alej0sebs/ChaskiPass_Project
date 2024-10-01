import { InferAttributes } from "sequelize";
import { Users } from "../models/users.models";



export type UserT=InferAttributes<Users>
export type UserLoginT=Pick<UserT, 'user_name' | 'email' | 'password'>