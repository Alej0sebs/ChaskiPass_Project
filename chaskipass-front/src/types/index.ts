export type SeatConfigT = {
    id:string,
    type: string,
    name: string,
    position: {"x": number, "y": number},
};

export type LayoutBusT = {
    id: number,
    name: string,
    cooperative_id: string,
    layout: {},
};

export type UserT={
    dni: string,
    name: string,
    last_name:string,
    user_name: string,
    email: string,
    phone: string,
    address: string,
    password: string,
    role_id: string
    cooperative_id: string
};

export type UserSignUpT=Pick<UserT,'email' | 'user_name' | 'password'>


export type UserLocalStorageT = Pick<UserT, 'user_name' | 'role_id' | 'cooperative_id'>
 
