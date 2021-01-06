export interface UserRegister {
    user_id?: number;
    first_name: string;
    last_name: string;
    phone: number;
    email: string;
    username: string;
    password: string;
    description: string;
    active?: boolean;
    roles: string;
}

export interface UserLogin {
    username: string;
    password: string;
}
