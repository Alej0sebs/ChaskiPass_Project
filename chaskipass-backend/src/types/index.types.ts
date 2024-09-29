export type UserT={
    dni: string,
    name: string,
    last_name: string,
    user_name: string,
    email: string,
    phone: string,
    password: string,
    address: string,
    role_id: string,
    cooperative_id: string
};

export type UserLoginT=Pick<UserT, 'user_name' | 'email' | 'password'>