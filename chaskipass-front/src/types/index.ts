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

export type TypeBusT={
    id: number,
    cooperative_id: string,
    bus_number:string,
    licence_plate:string,
    chassis_vin:string,
    bus_manufacture:string,
    model:string,
    year:number,
    capacity:number,
    picture:string,
    bus_structure_id:string
    };

export type BusStructureT={
    id: string;
    name: string;
}

export type UserSignUpT=Pick<UserT,'email' | 'user_name' | 'password'>


export type UserLocalStorageT = Pick<UserT, 'user_name' | 'role_id' | 'cooperative_id'>
 
// export type CreateUser=Pick<UserT,'dni'|'name'|'last_name'|'user_name'|'email'|'phone'|'address'|'role_id'|'cooperative_id'>

export type CreateUserT=Omit<UserT,'password'>

export type CreateBusT= Pick<TypeBusT,'id'|'cooperative_id'|'bus_number'|'licence_plate'|'chassis_vin'|'bus_manufacture'|
'model'|'year'|'capacity'|'picture'|'bus_structure_id'>

